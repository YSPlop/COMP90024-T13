#!/usr/bin/env python
# coding: utf-8

import json, couchdb, io, datetime
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np


class MastodonT13:
    
    def __init__(self):
        server = couchdb.Server('http://admin:password@172.26.131.88:5984')
        self.db_mastodon = server['mastodon']
        self.view_mastodon = '_design/mastodon/_view/count'
        self.view = self.db_mastodon.view(self.view_mastodon, reduce = True, group_level = 1)
        
        db_twitter = server['twitter']
        view_twitter = db_twitter.view('_design/location/_view/location')
        result = view_twitter.rows[0].value
        
        self.twitter_max = result['max']
        self.twitter_avg = result['avg']

    def hashtag_list(self):
        view = self.db_mastodon.view(self.view_mastodon, reduce = True, group_level = 1)
        hashtag_list = []
        
        for item in view:
            hashtag_list.append(item.key[0])
        
        return hashtag_list     
    
    def bar_chart(self):
        view = self.db_mastodon.view(self.view_mastodon, reduce = True, group_level = 1)
        score_list = []
        for item in view:
            score_list.append({"hashtag": item.key[0], "score": item.value['avg']})
        df = pd.DataFrame(score_list)
        x = np.arange(len(df["hashtag"]))
        
        plt.figure(figsize=(8, 6))
        plt.bar(x, df["score"], color = (8/255,89/255,156/255))
        plt.grid(True)
        plt.axhline(y = self.twitter_avg, color = (239/255,8/255,8/255) , linestyle='--')
        plt.text(x[-1] + 1, self.twitter_avg, 'Mean Sentiment Score (Twitter)', color = (239/255,8/255,8/255), fontsize = 12)
        plt.ylabel('Mean Sentiment Score per Hashtag (Mastodon)', fontsize = 12)
        plt.xticks(x, df["hashtag"], rotation = 45, fontsize = 12)
        
        timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        path = f'bar_chart_{timestamp}.png'
        plt.savefig(path)
        
        return path
    
    def histogram(self, hashtag):
        view = self.db_mastodon.view(self.view_mastodon, reduce = False)
        score_list = []
        for item in view:
            if item.key[0] == hashtag:
                score_list.append(item.value)
        
        plt.figure(figsize=(8, 6))  
        plt.hist(score_list, bins = 10, color = (8/255,89/255,156/255))
        plt.grid(True)
        
        plt.xlabel('Sentiment Score', fontsize = 12)
        plt.ylabel('Frequency', fontsize = 12)
        plt.title(f'Hashtag: {hashtag}', fontsize = 12)
        
        timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        path = f'histogram_{hashtag}_{timestamp}.png'
        plt.savefig(path)

        return path
        

