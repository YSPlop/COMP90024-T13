#!/usr/bin/env python
# coding: utf-8

# In[2]:


import couchdb

couch = couchdb.Server('http://admin:password@172.26.131.88:5984')

db = couch['sudo']

doc_id = '_design/sudo'
doc = db[doc_id]

map_update = '''
function(doc){
    if (doc.label == "income") {
        emit([doc.id, doc.lga_name], doc.gini_coefficient_coef);
    }
}
'''

reduce_function = '''
function(keys, values, rereduce) {
    return sum(values)/values.length;
}
'''

doc['views']['income'] = {
    'map': map_update,
    'reduce': reduce_function
}


db[doc_id] = doc


# In[ ]:




