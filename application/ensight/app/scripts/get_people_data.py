import asyncio
from itertools import chain
import aiohttp
import aiofiles
from aiofiles.threadpool.text import AsyncTextIOWrapper as AIOFile

import json
from typing import List


FILEPATH = './application/ensight/app/fixtures/partial_person_fixture.json'

with open('./tmdb_API_key.txt', 'r') as f:
    token = f.read().strip()

with open('./person_ids.txt', 'r') as f:
    ids = f.read().splitlines()

URLS_LEN = max(ids)

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

def filter_none(value):
    return value is not None

async def init_script():
    data = await execute_fetcher_tasks()
    # filter None values from 404s
    people = [*filter(filter_none, data)]

    # flatten lists of lists and filter None values for movies without reviews or credits

    with open(FILEPATH, mode="w", encoding="utf-8") as moviefile:
        moviefile.write(json.dumps(people, indent=4))
        moviefile.flush()
    
    # async with aiofiles.open(FILEPATH, mode='w+', encoding='utf-8') as outfile:
    #     await outfile.write('[\n')
    #     await execute_fetcher_tasks(outfile)
    #     async with aiofiles.open(FILEPATH, mode='+ab') as f:
    #         await f.seek(-3,2)
    #         await f.truncate()
    #         await f.write(str.encode('\n]'))
    #         await f.flush()
    #     await outfile.close()


# async def execute_fetcher_tasks(outfile: AIOFile):
async def execute_fetcher_tasks():
    session_timeout = aiohttp.ClientTimeout(total=None)
    async with aiohttp.ClientSession(headers=headers, timeout=session_timeout) as session:
        task_list = await create_tasks(session, ids)
        return await asyncio.gather(*task_list)


async def create_tasks(session: aiohttp.ClientSession, urls:List[str]) -> List[asyncio.Task]:
    task_list = []
    for id in ids:
        task = asyncio.create_task(fetch_and_save_data(session, id))
        task_list.append(task)
        # printProgressBar(len(task_list), URLS_LEN, prefix='Tasks\t')
    return task_list

async def fetch_and_save_data(session: aiohttp.ClientSession, id: str):
    data = None
    url = 'https://api.tmdb.org/3/person/' + str(id)
    while data is None:
        try:
            async with session.get(url, raise_for_status=True) as response:
                # await response.raise_for_status()
                data = await response.json()
        except aiohttp.ClientError as e:
            # e = response.status
            data = None
            print(f'Error {e.status}: {id}')
            if e.status == 404:
                return
            await asyncio.sleep(1)
    try:
        temp = {
            "model": "app.person",
            "pk": data["id"],
            "fields": {
            'name': data['name'],
            'profile_path': data['profile_path'],
            'biography': data['biography'],
            'known_for': data['known_for_department'],
            'popularity': data['popularity'],
            }
        }
        # temp['model'] = "app.person"
        # temp['pk'] = data['id']
        # temp['fields'] = {
        #     'name': data['name'],
        #     'profile_path': data['profile_path'],
        #     'biography': data['biography'],
        #     'known_for': data['known_for_department'],
        #     'popularity': data['popularity'],
        # }
    except KeyError as e:
        print(f'{id}: {data}')
    # printProgressBar(int(id), int(URLS_LEN), prefix='Data\t')
    return temp
    # await outfile.write(json.dumps(temp, ensure_ascii=False) + ',\n')
    # await outfile.flush()


if __name__ == '__main__':
    asyncio.run(init_script())