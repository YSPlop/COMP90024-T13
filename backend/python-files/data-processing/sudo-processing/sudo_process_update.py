#!/usr/bin/env python
# coding: utf-8

# In[1]:


import geopandas as gpd

df = gpd.read_file('./income.json')
df.dropna(inplace = True)


# In[4]:


from shapely.geometry import MultiPolygon
import couchdb
server = couchdb.Server("http://admin:password@172.26.131.88:5984/")
db = server['sudo']

for index, row in df.iterrows():
    temp = {}
    temp['label'] = 'income'
    for col_name in df.columns:
        if col_name == 'geometry':
            temp[col_name] = row[col_name].__geo_interface__
        else:
            temp[col_name] = row[col_name]
    db.save(temp)


# In[ ]:




