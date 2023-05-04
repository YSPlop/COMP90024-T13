#!/usr/bin/env bash
ansible-galaxy collection install openstack.cloud
. ./openrc.sh; ansible-playbook -K -i inventory.yaml playbook.yaml