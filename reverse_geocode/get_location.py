import ijson
import reverse_geocoder as rg
import numpy as np
import pandas as pd

if __name__ == '__main__':

    # Create a dictionary to store tweet ID and location information
    tweet_location_dict = {}
    with open('./test-data/twitter-data-small.json', 'r', encoding='utf-8') as f:
        
        # Create an ijson items iterator for the current process
        items = ijson.items(f, 'item',use_float=True)
        # Create a dictionary to store the results of reverse geocoding lookups
        location_cache = {}

        # Iterate over the items and process the tweets 
        for i, item in enumerate(items):
            id = item['_id']
            bounding_box = item['includes']['places'][0]['geo']['bbox']
            # Calculate the center of the bounding box
            centerx, centery = (np.average(bounding_box[::2]), np.average(bounding_box[1::2]))
            
            # Check if the location is already in the cache
            location_key = (round(centerx, 5), round(centery, 5))
            if location_key in location_cache:
                location = location_cache[location_key]
            else:
                # Perform the reverse geocoding lookup and store the result in the cache
                location = rg.search((centery, centerx))[0]['name']
                location_cache[location_key] = location
            tweet_location_dict[id] = location
            print(location)
    print(tweet_location_dict)    