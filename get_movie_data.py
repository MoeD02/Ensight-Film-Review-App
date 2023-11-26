import asyncio
import aiohttp
import aiofiles
from aiofiles.threadpool.text import AsyncTextIOWrapper as AIOFile

import json
from typing import List


FILEPATH = './movie_fixture.json'

with open('./tmdb_API_key.txt', 'r') as f:
    token = f.read().strip()

with open('./urls.txt', 'r') as f:
    urls = f.read().splitlines()

URLS_LEN = len(urls) - 1

headers = {
    'Authorization': 'Bearer ' + token,
}

def printProgressBar (iteration, total, prefix = '', suffix = '', decimals = 1, length = 100, fill = '█', printEnd = "\r"):
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
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filledLength = int(length * iteration // total)
    bar = fill * filledLength + '-' * (length - filledLength)
    print(f'\r{prefix} |{bar}| {percent}% {suffix}', end = printEnd)
    # Print New Line on Complete
    if iteration == total: 
        print()


async def init_script():
    async with aiofiles.open(FILEPATH, mode='w+', encoding='utf-8') as outfile:
        await outfile.write('[\n')
        await execute_fetcher_tasks(outfile)
        async with aiofiles.open(FILEPATH, mode='+ab') as f:
            await f.seek(-3,2)
            await f.truncate()
            await f.write(str.encode('\n]'))
            await f.flush()
        await outfile.close()


async def execute_fetcher_tasks(outfile: AIOFile):
    session_timeout = aiohttp.ClientTimeout(total=None)
    async with aiohttp.ClientSession(headers=headers, timeout=session_timeout) as session:
        task_list = await create_tasks(session, urls, outfile)
        await asyncio.gather(*task_list)


async def create_tasks(session: aiohttp.ClientSession, urls:List[str], outfile: AIOFile) -> List[asyncio.Task]:
    task_list = []
    for i, url in enumerate(urls):
        task = asyncio.create_task(fetch_and_save_data(session, url, outfile, i))
        task_list.append(task)
        printProgressBar(i, URLS_LEN, prefix='Tasks\t')
    return task_list

async def fetch_and_save_data(session: aiohttp.ClientSession, url: str, outfile: AIOFile, i: int):
    data = None
    while data is None:
        try:
            async with session.get(url, raise_for_status=True) as response:
                # await response.raise_for_status()
                data = await response.json()
        except aiohttp.ClientError as e:
            # e = response.status
            data = None
            print(f'Error {e.status}: {url}')
            if e.status == 404:
                return
            await asyncio.sleep(1)
    try:
        temp = {}
        temp['model'] = "app.movie"
        temp['pk'] = data['id']
        temp['fields'] = {
            'title': data['title'],
            'poster_path': data['poster_path'],
            'backdrop_path': data['backdrop_path'],
            'genres': [e['id'] for e in data['genres']],
            'release_date': data['release_date'] if not data['release_date'] == "" else None,
            'description': data['overview'],
            'runtime': data['runtime'],
            'rating_count': data['vote_count'],
            'rating_average': data['vote_average'],
            'popularity': data['popularity'],
            'trailer_path': None,
            'director': None,
        }
        if 'videos' in data:
            for e in data['videos']['results']:
                if e['type'] == 'Trailer' and e['official'] and e['site'] == 'YouTube':
                    temp['fields']['trailer_path'] = e['key']
                    break
        if 'credits' in data:
            for e in data['credits']['crew']:
                if e['job'] == 'Director':
                    temp['fields']['director'] = e['id']
                break
    except KeyError as e:
        print(f'{url}: {data}')
    printProgressBar(i, URLS_LEN, prefix='Data\t')
    await outfile.write(json.dumps(temp, ensure_ascii=False) + ',\n')
    await outfile.flush()


if __name__ == '__main__':
    asyncio.run(init_script())