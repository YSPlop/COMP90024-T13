#!/usr/bin/env python
# coding: utf-8

import json, couchdb

server = couchdb.Server('http://admin:password@172.26.131.88:5984')
db = server['twitter']

view = '_design/location/_view/location'

# Query all document
view_all = db.view(view, include_docs = True, reduce = False)
for item in view_all:
    tweet = {
        'tweet_id': item['doc']['tweet_id'],
        'score': item['doc']['score'],
        'category': item['doc']['category'],
        'suburb': item['doc']['suburb'],
        'lga': item['doc']['lga'],
        'state': item['doc']['state'],
        'centrex': item['doc']['centrex'],
        'centrey': item['doc']['centrey'],
    }
    
    print(json.dumps(tweet, indent = 4))
    '''Sample Output
        {
            "tweet_id": "1412195663106875395",
            "score": 0.697,
            "category": 1,
            "suburb": "Harrisdale",
            "lga": "Armadale",
            "state": "Western Australia",
            "centrex": 115.928318688,
            "centrey": -32.150100419750004
        }
    '''

# Query aggregated document per lga
view_lga = db.view(view, reduce = True, group_level = 2)
for item in view_lga:
    if item.key[1] != '':
        lga = {
            'lga': item.key[1],
            'max': item.value['max'],
            'avg': item.value['avg'],
            'count': item.value['count']
        }
        
        print(json.dumps(lga, indent = 4))
        '''Sample Output
            {
                "lga": "Sunshine Coast",
                "max": 0.392,
                "avg": 0.09384,
                "count": 25
            }
        '''
# Query aggregated document per state
view_state = db.view(view, reduce = True, group_level = 1)
for item in view_state:
    if item.key[0] != '':
        state = {
            'state': item.key[0],
            'max': item.value['max'],
            'avg': item.value['avg'],
            'count': item.value['count']
        }
        
        print(json.dumps(state, indent = 4))
        '''Sample Output
            {
                "state": "Victoria",
                "max": 0.655,
                "avg": 0.04230128205128205,
                "count": 156
            }
        '''

# Query MAX, AVG, COUNT among all document
view_total = db.view(view)
result = view_total.rows[0].value

print(result['max'])
print(result['avg'])
print(result['count'])
