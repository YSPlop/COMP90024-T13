#!/bin/bash
# Team 13: Alex Wang 1427869, Ka Shun Carson Young 1086178, Eldon Yeh 1276574, Yukash Sivaraj 1054297
# from couchdb docs
# curl -X POST -H "Content-Type: application/json" http://admin:password@${masternode}:5984/_cluster_setup -d\
#  "{\"action\": \"enable_cluster\", \"bind_address\":\"0.0.0.0\", \"username\": \"admin\",\
#   \"password\":\"password\", \"port\": 5984, \"node_count\": \"${nodecount}\", \"remote_node\": \"${node}\",\
#    \"remote_current_user\": \"admin\", \"remote_current_password\": \"password\" }"

# curl -X POST -H "Content-Type: application/json" http://admin:password@${masternode}:5984/_cluster_setup -d\
#  "{\"action\": \"add_node\", \"host\":\"${node}\", \"port\": 5984,\
#   \"username\": \"admin\", \"password\":\"password\"}"

curl -X POST -H "Content-Type: application/json" http://admin:password@${masternode}:5984/_cluster_setup -d '{"action": "finish_cluster"}'

# curl http://admin:password@${masternode}:5984/_cluster_setup

# curl http://admin:password@${masternode}:5984/_membership