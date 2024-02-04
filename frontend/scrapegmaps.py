import math
import random
import googlemaps
import pickle

gmaps = googlemaps.Client(key='nuh uh')

places = []
bound1 = (51.556565216753306, -0.21628950336275413)
bound2 = (51.47973746280445, 0.01638093183217833)

def cartesian_distance(point1, point2):
    x1, y1 = point1
    x2, y2 = point2

    distance = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    return distance

n = 1000
while len(places) < n:
    #Normally distribute points within the bounds
    centre = (bound1[0] + bound2[0]) / 2, (bound1[1] + bound2[1]) / 2
    radius = cartesian_distance(centre, bound1) * 6
    angle = random.uniform(0, 2 * math.pi)
    distance = random.gauss(0, radius / 4)
    if distance > radius:
        continue
    x = centre[0] + distance * math.cos(angle)
    y = centre[1] + distance * math.sin(angle)
    # Get closest place to point
    closest = gmaps.places_nearby(location=(x, y), radius=100, type='store')
    if len(closest['results']) > 0:
        places.append(closest)
    print(len(places) / n * 100, '%')

pickle.dump(places, open('places.p', 'wb'))
