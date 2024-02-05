import csv
import json


def arithmetic_mean(l):
    return sum(l) / len(l)


# scrape london_boroughs.csv
with open('london_boroughs.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip header row
    boroughPoints = list(reader)

boroughs = []
previousName = ""
for borough in boroughPoints:
    if (borough[0] != previousName):
        previousName = borough[0]
        boroughs.append(borough[0])
h = []
for title in boroughs:
    h.append([title, arithmetic_mean([float(borough[1]) for borough in boroughPoints[1:] if borough[0] == title]),
              arithmetic_mean([float(borough[2]) for borough in boroughPoints[1:] if borough[0] == title])])
# export h to borough_coords.json


with open('borough_coords.json', 'w') as f:
    json.dump(h, f, indent=4)
