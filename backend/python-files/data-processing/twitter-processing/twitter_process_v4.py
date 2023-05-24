
#!/usr/bin/env python
# coding: utf-8

# Team 13: Alex Wang 1427869, Ka Shun Carson Young 1086178, Eldon Yeh 1276574, Yukash Sivaraj 1054297

import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import reverse_geocoder as rg
import numpy as np
import ijson, sys
import couchdb
from datetime import datetime

def text_to_sentiment(sid, text):
    """Extract sentiment score and category from text.
    
    Arguments:
        sid (object): sentiment intensity analyzer
        text (str): tweet text from raw twitter data set
    
    Returns:
        score (float): a float number ranging from 0 to 1 (the closer the number to 1, the more negative the tweet)
        category (int): #0 non-aggressive #1 aggressive
    """
    if (text is None) or (text == ""):
            return None
    
    # Calculate the negative score
    score = sid.polarity_scores(text)['neg']
    
    # Categorize the text
    category = 0
    if (score > 0.5):
        category = 1
    
    return score, category

def bbox_to_location(bbbox):
    """Convert a bounding box to subrub.
    
    Arguments:
        bbox (list): bounding box in the form [longitude, latitude, longitude, latitude]
    
    Returns:
        subrub (str): Suburb Name
        lga (str): Local government area
        state (str): State Name
        centrex (float): Centre of bounding box longitude
        centrey (float): Centre of bounding box lattitude
    """

    # Calculate the center of the bounding box
    centrex, centrey = (np.average(bbox[::2]), np.average(bbox[1::2]))

    # Perform the reverse geocoding lookup and return desired location attributes
    location_data = rg.search((centrey, centrex))
    suburb = location_data[0]['name']
    state =  location_data[0]['admin1']
    lga = location_data[0]['admin2']
    
    return suburb, lga, state, centrex, centrey

if __name__ == "__main__":
    
    log = open("twitter-process-log-v4.txt", "w")
    start = datetime.now()
    print("Start At: ", start, file = log)

    # Receive raw twitter file
    twitter_file = sys.argv[1]
    
    # Connect to CouchDB
    couch = couchdb.Server("http://admin:password@172.26.131.88:5984/")
    db = couch[sys.argv[2]]
    
    # Initialize sentiment intensity analyzer
    nltk.download('vader_lexicon')
    sid = SentimentIntensityAnalyzer()
    
    line = 0
    msg = True

    # Process raw twitter file line by line
    with open(twitter_file, "rb") as f:
        twitter_obj = ijson.items(f, "rows.item", use_float = True)
        for item in twitter_obj:
            line = line + 1
            tweet_id = item["doc"]["_id"]
            text = item["doc"]["data"]["text"]
            try:
                bbox = item["doc"]["includes"]["places"][0]["geo"]["bbox"]
            except Exception:
                continue
            
            if (msg == True):
                print("")
                print("First Line With BBOX: ", line)
                print("----------Sample Item----------")
                print(item)
                print("")
                msg = False

            if (bbox != None):
                sentiment = text_to_sentiment(sid, text)
                location = bbox_to_location(bbox)
                                            
                processed_obj = {
                    "tweet_id": tweet_id,
                    "score": sentiment[0],
                    "category": sentiment[1],
                    "suburb": location[0],
                    "lga": location[1],
                    "state": location[2],
                    "centrex": location[3],
                    "centrey": location[4]
                }
            
                # Add processed entry to CouchDB
                db.save(processed_obj)
            

    end = datetime.now()
    print("End At: ", end, file = log)
    log.close()
