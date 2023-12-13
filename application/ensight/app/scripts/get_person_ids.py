import re

INFILE = "./application/ensight/app/fixtures/credits_fixture.json"
OUTFILE = "./person_ids.txt"
pattern = '(?<="person": )[0-9]+(?=,)'

with open(INFILE, mode="r", encoding="utf-8") as inFile:
    data = inFile.read()

ids = re.findall(pattern, data)
no_dups = set(ids)
with open(OUTFILE, mode="w") as outFile:
    outFile.write("\n".join(no_dups))
    outFile.flush()
