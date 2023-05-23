#!/usr/bin/env python
# coding: utf-8
# Team 13: Alex Wang 1427869, Ka Shun Carson Young 1086178, Eldon Yeh 1276574, Yukash Sivaraj 1054297
from mastodon import Mastodon, MastodonNotFoundError, MastodonRatelimitError, StreamListener
import os, time
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import couchdb
import sys

os.environ['MASTODON_ACCESS_TOKEN'] = 'xSuy_p92WUs4Eq7B2g-ps4vUcnjnEBTYjRQ2IbZvCvI'
access_token = os.environ['MASTODON_ACCESS_TOKEN']
mastodon_url = "https://mastodon.social"

# Connect to mastodon
mastodon = Mastodon(
    access_token=access_token,
    api_base_url=mastodon_url,
)

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

class Listener(StreamListener): 
    def __init__(self):

        # Initialize sentiment analyzer
        nltk.download('vader_lexicon')
        self.sid = SentimentIntensityAnalyzer()
        
        # Connect to CouchDB
        couch = couchdb.Server("http://admin:password@172.26.131.88:5984/")
        self.db = couch["mastodon"]
        self.hashtag = sys.argv[1]
        
    def on_update(self, status):
        self.process_item(status, self.sid, self.db)

    def process_item(self, item, sid, db):
        if (item['content'] != None) and (item['content'] != "") and (item['language'] == 'en'):
            text = item['content']
            sentiment = text_to_sentiment(sid, text)
                
            processed_obj = {
                "hashtag": self.hashtag,
                "text": text,
                "score": sentiment[0],
                "category": sentiment[1]
            }

            # Add entry to CouchDB
            db.save(processed_obj)

# Stream hashtags from mastodon
listener = Listener()
mastodon.stream_hashtag(sys.argv[1], listener=listener)

