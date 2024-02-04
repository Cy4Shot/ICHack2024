#Scrape spendingbyborough.csv into a list
import csv
with open('spendingbyborough.csv', 'r') as f:
    reader = csv.reader(f)
    spending = list(reader)

futureAverageSpending = []

for i in range(1,len(spending)):
    futureAverageSpending.append({"Name":spending[i][0],"Future Average Spending":round(sum([int(k) for k in spending[i][24:38]])/14)})

#write the list into spendingbyborough.json, with the field names as Borough and Future Average Spending
import json
with open('spendingbyborough.json', 'w') as f:
    json.dump(futureAverageSpending, f)