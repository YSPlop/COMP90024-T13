#!/usr/bin/env python
# coding: utf-8

"""
The twitter_process script has 2 versions.
v1: output processed data as JSON file to the same directory (testing version)
v2: add processed data to CouchDB (productive version)
"""

import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import reverse_geocoder as rg
import numpy as np
import ijson, sys

# Import json for v1; Omit in v2
import json

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
    
    return suburb, state, centrex, centrey

if __name__ == "__main__":
    
    # Create result list for v1, Omit in v2
    result = []
    
    # Receive raw twitter file
    twitter_file = sys.argv[1]
    
    # Initialize sentiment intensity analyzer
    nltk.download('vader_lexicon')
    sid = SentimentIntensityAnalyzer()
    
    # Process raw twitter file line by line
    with open(twitter_file, "rb") as f:
        twitter_obj = ijson.items(f, "item", use_float = True)
        for item in twitter_obj:
            tweet_id = item["_id"]
            text = item["data"]["text"]
            bbox = item["includes"]["places"][0]["geo"]["bbox"]
            
            sentiment = text_to_sentiment(sid, text)
            location = bbox_to_location(bbox)
                                
            processed_obj = {
                "tweet_id": tweet_id,
                "score": sentiment[0],
                "category": sentiment[1],
                "suburb": location[0],
                "state": location[1],
                "centrex": location[2],
                "centrey": location[3]
            }
            
            # Append processed object (dict) to result list for v1, Replace to add to CouchDB in v2
            result.append(processed_obj)
    
    # Output processed data as JSON file for v1, Omit in v2
    with open('output.json', 'w') as file:
        json.dump(result, file)

