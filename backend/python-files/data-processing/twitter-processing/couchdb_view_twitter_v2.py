#!/usr/bin/env python
# coding: utf-8

# Team 13: Alex Wang 1427869, Ka Shun Carson Young 1086178, Eldon Yeh 1276574, Yukash Sivaraj 1054297
import couchdb

server = couchdb.Server('http://admin:password@172.26.131.88:5984')
db = server['twitter']

# Distribute twitter data across machine by <State> and <LGA>
# Emit the sentiment score as the value
map_function = '''
function(doc){
    if (doc.state == "Victoria") {
        emit([doc.state, doc.lga], doc.score);
    }
    if (doc.state == "New South Wales") {
        emit([doc.state, doc.lga], doc.score);
    }
    if (doc.state == "Western Australia") {
        emit([doc.state, doc.lga], doc.score);
    }
    if (doc.state == "South Australia") {
        emit([doc.state, doc.lga], doc.score);
    }
    if (doc.state == "Queensland") {
        emit([doc.state, doc.lga], doc.score);
    }
}
'''

# Aggreagte values to <Count>, <Sum>, <Avg>, and <Max>
reduce_function = '''
function(keys, values, rereduce) {
    if (rereduce) {
        var result = values[0];
        for (var i = 1; i < values.length; i++) {
            result.max = Math.max(result.max, values[i].max);
            result.sum += values[i].sum;
            result.count += values[i].count;
        }
        result.avg = result.sum / result.count;
        return result;
    } else {
        var result = {sum: 0, count: 0, max: values[0]};
        for (var i = 0; i < values.length; i++) {
            result.max = Math.max(result.max, values[i]);
            result.sum += values[i];
            result.count++;
        }
        result.avg = result.sum / result.count;
        return result;
    }
}
'''


# Create view under _design/location
view = {
    '_id': '_design/location',
    'views': {
        'location': {
            'map': map_function,
            'reduce': reduce_function
        }
    }
}

db.save(view)
