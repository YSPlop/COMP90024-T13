#!/usr/bin/env bash
# Team 13: Alex Wang 1427869, Ka Shun Carson Young 1086178, Eldon Yeh 1276574, Yukash Sivaraj 1054297
ansible-galaxy collection install community.docker
ansible-playbook -i inventory.yaml stop-couchdb.yaml