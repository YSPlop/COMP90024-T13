#!/usr/bin/env python
# coding: utf-8

# In[1]:


import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

class Sentiment:
    def __init__(self):
        nltk.download('vader_lexicon')
        self.sid = SentimentIntensityAnalyzer()
    
    def score(self, text):
        if (text is None) or (text == ""):
            return None
        return self.sid.polarity_scores(text)['neg']
    
    def category(self, text):
        if (text is None) or (text == ""):
            return None
        score = self.sid.polarity_scores(text)['neg']
        if score > 0.5:
            return 1
        else:
            return 0

