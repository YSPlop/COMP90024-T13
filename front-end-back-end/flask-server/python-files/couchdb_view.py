#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import couchdb

server = couchdb.Server('http://admin:password@172.26.131.88:5984')
db = server['twitter-test']

# View 1: all proecssed data from tinyTwitter
view_1 = db.view('_design/test/_view/new-view', stale = 'ok', include_docs = True)
for row in view_1:
    print(row['doc'])
    
    # Sample out put
    # {'_id': '3e8389f94cad2b7448b39fb2170016b5', '_rev': '1-7289866c754db70535758c9ae7794b55', 
    # 'tweet_id': '1412193387575316482', 'score': 0.0, 'category': 0, 'suburb': 'Coober Pedy', 
    # 'lga': 'Coober Pedy', 'state': 'South Australia', 'centrex': 136.0151665, 'centrey': -26.441329}


# In[ ]:


# View 2: average sentiment score per lga
view_2 = db.view('_design/test/_view/avg-view', stale = 'ok', group_level = 1)

for row in view_2:
    print(row)

