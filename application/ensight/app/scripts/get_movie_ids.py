import re

INFILE = "./movie_ids_12_03_2023.json"
OUTFILE = "./movie_ids.txt"
pattern = '(?!.*true})(?<="id":)[0-9]+(?=,)'

with open(INFILE, mode="r", encoding="utf-8") as inFile:
    data = inFile.read()

ids = re.findall(pattern, data)

with open(OUTFILE, mode="w") as outFile:
    outFile.write("\n".join(ids))
    outFile.flush()
