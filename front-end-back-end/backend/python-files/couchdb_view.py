#!/usr/bin/env python
# coding: utf-8


import couchdb
server = couchdb.Server('http://admin:password@172.26.131.88:5984')

#------------------------------[Testing] Twitter CouchDB View------------------------------
db = server['twitter-test']

# View 1: all proecssed data from tinyTwitter
view_1 = db.view('_design/test/_view/new-view', stale = 'ok', include_docs = True)
for row in view_1:
    print(row['doc'])
    
    # Sample output
    # {'_id': '3e8389f94cad2b7448b39fb2170016b5', '_rev': '1-7289866c754db70535758c9ae7794b55', 
    # 'tweet_id': '1412193387575316482', 'score': 0.0, 'category': 0, 'suburb': 'Coober Pedy', 
    # 'lga': 'Coober Pedy', 'state': 'South Australia', 'centrex': 136.0151665, 'centrey': -26.441329}

# View 2: average sentiment score per lga
view_2 = db.view('_design/test/_view/avg-view', stale = 'ok', group_level = 1)

for row in view_2:
    print(row)
 
#------------------------------Mastodon CouchDB View------------------------------
import json

# Connect to mastodon db
db_mastodon = server['mastodon']

# Query all data from mastodon db
view_mastodon = db_mastodon.view('_all_docs', stale = 'ok', include_docs = True)

for item in view_mastodon:
    
    # Extract hashtag, sentiment-negative score, and text of each toot
    toot = {
        'hashtag': item.doc['hashtag'],
        'score': item.doc['score'],
        'text': item.doc['text']
    }
    
    print(json.dumps(toot, indent = 4))
    
    '''Sample Output
        {
            "hashtag": "eurovision",
            "score": 0.302,
            "text": "<p>Netherlands looks and sounds like Fire Saga.</p><p>Again, not an insult! I love Fire Saga!</p><p><a href=\"https://wandering.shop/tags/Eurovision\" class=\"mention hashtag\" rel=\"nofollow noopener noreferrer\" target=\"_blank\">#<span>Eurovision</span></a></p>"
        }
    '''
  




