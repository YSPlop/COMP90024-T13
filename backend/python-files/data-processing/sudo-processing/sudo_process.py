#!/usr/bin/env python
# coding: utf-8

# In[1]:


import geopandas as gpd

df1 = gpd.read_file('./children_mother_education.json')
df1.dropna(inplace = True)

df2 = gpd.read_file('./family_stress.json')
df2.dropna(inplace = True)

df3 = gpd.read_file('./family_violence.json')
df3.dropna(inplace = True)

df4 = gpd.read_file('./family_violence_patient.json')
df4.dropna(inplace = True)

df5 = gpd.read_file('./housing_stress.json')
df5.dropna(inplace = True)


# In[4]:


from shapely.geometry import MultiPolygon
import couchdb
server = couchdb.Server("http://admin:password@172.26.131.88:5984/")
db = server['sudo']

for index, row in df1.iterrows():
    temp = {}
    temp['label'] = 'children_mother_education'
    for col_name in df1.columns:
        if col_name == 'geometry':
            temp[col_name] = row[col_name].__geo_interface__
        else:
            temp[col_name] = row[col_name]
    db.save(temp)


# In[5]:


for index, row in df2.iterrows():
    temp = {}
    temp['label'] = 'family_stress'
    for col_name in df2.columns:
        if col_name == 'geometry':
            temp[col_name] = row[col_name].__geo_interface__
        else:
            temp[col_name] = row[col_name]
    db.save(temp)


# In[6]:


for index, row in df3.iterrows():
    temp = {}
    temp['label'] = 'family_violence'
    for col_name in df3.columns:
        if col_name == 'geometry':
            temp[col_name] = row[col_name].__geo_interface__
        else:
            temp[col_name] = row[col_name]
    db.save(temp)


# In[7]:


for index, row in df4.iterrows():
    temp = {}
    temp['label'] = 'family_violence_patient'
    for col_name in df4.columns:
        if col_name == 'geometry':
            temp[col_name] = row[col_name].__geo_interface__
        else:
            temp[col_name] = row[col_name]
    db.save(temp)


# In[8]:


for index, row in df5.iterrows():
    temp = {}
    temp['label'] = 'housing_stress'
    for col_name in df5.columns:
        if col_name == 'geometry':
            temp[col_name] = row[col_name].__geo_interface__
        else:
            temp[col_name] = row[col_name]
    db.save(temp)

