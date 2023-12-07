import asyncio
import aiohttp
import json

from django.utils import dateparse
from itertools import chain
from typing import List

with open("./tmdb_API_key.txt", "r") as f:
    token = f.read().strip()

headers = {
    "Authorization": "Bearer " + token,
}


with open("./movie_ids.txt", "r") as f:
    ids = f.read().splitlines()

IDS_LEN = len(ids)
MOVIE_FIXTURE = "./application/ensight/app/fixtures/movie_fixture.json"
CREDITS_FIXTURE = "./application/ensight/app/fixtures/credits_fixture.json"
REVIEWS_FIXTURE = "./application/ensight/app/fixtures/review_fixture.json"


def filter_none(value):
    return value is not None


async def init_script():
    data = await execute_fetcher_tasks()
    # filter None values from 404s
    movies, credit_lists, review_lists = zip(*filter(filter_none, data))

    # flatten lists of lists and filter None values for movies without reviews or credits
    credits = [*chain(*filter(filter_none, credit_lists))]
    reviews = [*chain(*filter(filter_none, review_lists))]
    with open(MOVIE_FIXTURE, mode="w", encoding="utf-8") as moviefile:
        moviefile.write(json.dumps(movies, indent=4))
        moviefile.flush()
    with open(CREDITS_FIXTURE, mode="w", encoding="utf-8") as creditfile:
        creditfile.write(json.dumps(credits, indent=4))
        creditfile.flush()
    with open(REVIEWS_FIXTURE, mode="w", encoding="utf-8") as reviewfile:
        reviewfile.write(json.dumps(reviews, indent=4))
        reviewfile.flush()


async def execute_fetcher_tasks():
    session_timeout = aiohttp.ClientTimeout(total=None)
    async with aiohttp.ClientSession(
        headers=headers, timeout=session_timeout
    ) as session:
        task_list = await create_tasks(session, ids)
        all_data = await asyncio.gather(*task_list)
        return all_data


async def create_tasks(
    session: aiohttp.ClientSession,
    ids: List[int],
) -> List[asyncio.Task]:
    task_list = []
    for id in ids:
        task = asyncio.create_task(fetch_and_save_data(session, id))
        task_list.append(task)
        printProgressBar(len(task_list), IDS_LEN, prefix="Init \t")
    return task_list


async def fetch_and_save_data(session: aiohttp.ClientSession, id: int):
    data = None
    while data is None:
        try:
            async with session.get(
                f"https://api.tmdb.org/3/movie/{id}?append_to_response=videos,credits,reviews&language=en-US",
                raise_for_status=True,
            ) as response:
                data = await response.json()
        except aiohttp.ClientError as e:
            print(f"Error {e.status}: {id}")
            if e.status == 404:
                return None
            await asyncio.sleep(1)  # back off to respect 429 or resolve 504

    movie = {
        "model": "app.movie",
        "pk": data["id"],
        "fields": {
            "title": data["title"],
            "poster_path": data["poster_path"],
            "backdrop_path": data["backdrop_path"],
            "genres": [e["id"] for e in data["genres"]],
            "release_date": data["release_date"]
            if not data["release_date"] == ""
            else None,
            "description": data["overview"],
            "runtime": data["runtime"],
            "rating_count": data["vote_count"],
            "rating_average": float("%.2f" % (data["vote_average"] / 2)),
            "popularity": data["popularity"],
            "trailer_path": None,
        },
    }
    reviews = []
    credits = []
    try:
        for e in data["videos"]["results"]:
            if e["type"] == "Trailer" and e["official"] and e["site"] == "YouTube":
                movie["fields"]["trailer_path"] = e["key"]
                break
    except KeyError:
        print(f"Error: {id} -- videos")

    try:
        for e in data["credits"]["cast"]:
            if e["order"] > 5:
                break
            credit = {
                "model": "app.creditlist",
                "fields": {
                    "movie": data["id"],
                    "person": e["id"],
                    "job": "Actor",
                    "role": e["character"],
                },
            }
            credits.append(credit)

        for e in list(
            filter(
                lambda credit: credit["job"] in ["Writer, Director"],
                data["credits"]["crew"],
            )
        ):
            credit = {
                "model": "app.creditlist",
                "fields": {
                    "movie": data["id"],
                    "person": e["id"],
                    "job": e["job"],
                    "role": None,
                },
            }
            credits.append(credit)
    except KeyError:
        print(f"Error: {id} -- credits")
        credits = None

    try:
        for i, e in enumerate(data["reviews"]["results"], 1):
            if i > 5:
                break
            review = {
                "model": "app.review",
                "fields": {
                    "movie": data["id"],
                    "author": i,
                    "text": e["content"],
                    "created_at": str(dateparse.parse_datetime(e["created_at"])),
                    "rating": e["author_details"]["rating"] / 2
                    if e["author_details"]["rating"]
                    else None,
                },
            }
            reviews.append(review)
    except KeyError:
        print(f"Error: {id} -- reviews")
        reviews = None
    printProgressBar(int(id), 1212783, prefix="Fetch \t")
    return (movie, credits, reviews)


def printProgressBar(
    iteration,
    total,
    prefix="",
    suffix="",
    decimals=1,
    length=100,
    fill="█",
    printEnd="      \r",
):
    """
    Call in a loop to create terminal progress bar
    @params:
        iteration   - Required  : current iteration (Int)
        total       - Required  : total iterations (Int)
        prefix      - Optional  : prefix string (Str)
        suffix      - Optional  : suffix string (Str)
        decimals    - Optional  : positive number of decimals in percent complete (Int)
        length      - Optional  : character length of bar (Int)
        fill        - Optional  : bar fill character (Str)
        printEnd    - Optional  : end character (e.g. "\r", "\r\n") (Str)
    """
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / total))
    filledLength = int(length * iteration // total)
    bar = fill * filledLength + "-" * (length - filledLength)
    print(f"\r{prefix} |{bar}| {percent}% {suffix}", end=printEnd)
    bar = fill * filledLength + "-" * (length - filledLength)
    print(f"\r{prefix} |{bar}| {percent}% {suffix}", end=printEnd)
    # Print New Line on Complete
    if iteration == total:
        print()


if __name__ == "__main__":
    asyncio.run(init_script())
