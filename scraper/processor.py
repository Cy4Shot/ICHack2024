import pickle, math

places = pickle.load(open('places.p', 'rb'))
count_customers = pickle.load(open('count_customers.p', 'rb'))

class Place:
    def __init__(self, name, place_id, value, lat, long):
        self.name = name
        self.place_id = place_id
        self.value = value
        self.lat = lat
        self.long = long

    def __str__(self):
        return "Name: " + self.name + " Place ID: " + self.place_id + " Value: " + str(self.value)  + " Latitude: " + str(self.lat) + " Longitude: " + str(self.long)

proc_places = []
for i in range(len(places)):
    np = Place(places[i]["name"], places[i]["place_id"], math.sqrt(count_customers[i]), places[i]["geometry"]["location"]["lat"], places[i]["geometry"]["location"]["lng"])
    proc_places.append(np)

# Normalize the price range
max_price = max([p.value for p in proc_places])
min_price = min([p.value for p in proc_places])
r = (max_price - min_price)
for p in proc_places:
    p.nvalue = (p.value - min_price) / r

# dump to json
import json
json_places = []
for place in proc_places:
    json_places.append({"name": place.name, "place_id": place.place_id, "norm": place.nvalue, "value": place.value, "latitude": place.lat, "longitude": place.long})

with open('places.json', 'w') as f:
    json.dump(json_places, f, indent=4)