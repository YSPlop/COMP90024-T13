#!/usr/bin/env python
# coding: utf-8

# In[2]:


import couchdb

server = couchdb.Server('http://admin:password@172.26.131.88:5984')
db = server['sudo']

map_1 = '''
function(doc){
    if (doc.label == "children_mother_education") {
        emit([doc.id, doc.lga_name], doc.chldrn_fmls_mthr_lw_edctnl_attnmnt_2016_pc_in_whre_the_hs);
    }
}
'''

map_2 = '''
function(doc){
    if (doc.label == "family_stress") {
        emit([doc.id, doc.lga_name], doc.indicator_2015);
    }
}
'''

map_3 = '''
function(doc){
    if (doc.label == "family_violence") {
        emit([doc.id, doc.lga_name11], doc.domestic_family_sexual_violence_rate_per_100k);
    }
}
'''

map_4 = '''
function(doc){
    if (doc.label == "family_violence_patient") {
        emit([doc.id, doc.lga_name11], doc.patient_rate_per_100k_2017_18);
    }
}
'''

map_5 = '''
function(doc){
    if (doc.label == "housing_stress") {
        emit([doc.id, doc.lga_name16], doc.very_low_income_less_than_603_dollars_per_wk);
    }
}
'''



reduce_function = '''
function(keys, values, rereduce) {
    return sum(values)/values.length;
}
'''


view = {
    '_id': '_design/sudo',
    'views': {
        'children_mother_education': {
            'map': map_1,
            'reduce': reduce_function
        },
        'family_stress': {
            'map': map_2,
            'reduce': reduce_function
        },
        'family_violence': {
            'map': map_3,
            'reduce': reduce_function
        },
        'family_violence_patient': {
            'map': map_4,
            'reduce': reduce_function
        },
        'housing_stress': {
            'map': map_5,
            'reduce': reduce_function
        }
    }
}

db.save(view)


# In[ ]:




