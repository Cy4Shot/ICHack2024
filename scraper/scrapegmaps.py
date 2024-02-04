import math
import random
import googlemaps
import pickle
import datetime

gmaps = googlemaps.Client(key='nuh uh')

def unix_timestamp_diff_in_days(timestamp1, timestamp2):
    # Convert Unix timestamps to datetime objects
    dt1 = datetime.datetime.utcfromtimestamp(timestamp1)
    dt2 = datetime.datetime.utcfromtimestamp(timestamp2)

    # Calculate the difference between the two datetime objects
    time_difference = dt2 - dt1

    # Get the number of days from the time difference
    days_difference = time_difference.days

    return days_difference

places = []
count_customers = []
bound1 = (51.556565216753306, -0.21628950336275413)
bound2 = (51.47973746280445, 0.01638093183217833)

def cartesian_distance(point1, point2):
    x1, y1 = point1
    x2, y2 = point2

    distance = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    return distance

n =10000
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
    closest = gmaps.places_nearby(location=(x, y), radius=100, type='cafe')
    if len(closest['results']) > 0:
        if "price_level" in closest['results'][0]:
            curr = closest['results'][0]
            res = gmaps.place(curr["place_id"], reviews_sort="newest")
            if "reviews" not in res["result"]:
                continue
            reviews = res["result"]["reviews"]
            if len(reviews) < 5:
                continue
            review_diff = unix_timestamp_diff_in_days(reviews[4]["time"], reviews[0]["time"])
            if review_diff == 0:
                reviews_per_day = 4
            else:
                reviews_per_day = 4 / unix_timestamp_diff_in_days(reviews[4]["time"], reviews[0]["time"])
            if "opening_hours" in res["result"]:
                open_ratio = len([1 for x in res["result"]["opening_hours"]["weekday_text"] if "closed" not in x.lower()]) / 7
            else:
                open_ratio = 0.8
            avg_customer_count_per_day = reviews_per_day / 0.0005 * open_ratio
            places.append(curr)
            count_customers.append(avg_customer_count_per_day)
    print(len(places) / n * 100, '%')

pickle.dump(places, open('places.p', 'wb'))
pickle.dump(count_customers, open('count_customers.p', 'wb'))