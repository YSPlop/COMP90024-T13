#!/usr/bin/env bash
ansible-galaxy collection install community.docker
ansible-playbook -i inventory.yaml couchdb-playbook.yaml