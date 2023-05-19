# COMP90024-T13

## Installation commands

```sh
sudo apt install npm

npm install http-server

npm i react

npm i react-dom

npm install @mui/material @emotion/react @emotion/styled

npm install axios
```

## Running the application

### Front end

```sh
cd front-end-back-end/client
npm run dev
```

### Back end

```sh
cd front-end-back-end/flask-server/
python3 server.py
```

### Running the https server 

```sh
cd "path/to/folder/with/all/the/files/required"
# -p 1000 : sets the port number to 1000
# --cors : the cors command opens up the server for public access
# -c-1 : removes the servers cache which allows auto refresh
http-server -p 1000 -g --cors -c-1
```

## Structure of files

```bash
ansible-scripts
   |-- inventory.yaml
   |-- openrc.sh
   |-- playbook.yaml
   |-- roles
   |   |-- docker
   |   |   |-- docker-permissions.sh
   |   |   |-- tasks
   |   |   |   |-- main.yaml
   |   |-- hostnames
   |   |   |-- tasks
   |   |   |   |-- main.yaml
   |   |-- sshkeys
   |   |   |-- tasks
   |   |   |   |-- main.yaml
   |   |-- volumes
   |   |   |-- tasks
   |   |   |   |-- main.yaml
   |-- run-playbook.sh
couchdb
   |-- dbdata
   |   |-- _dbs.couch
   |   |-- _nodes.couch
   |-- docker-compose.yaml
front-end-back-end-test
   |-- client
   |   |-- src
   |   |   |-- App.css
   |   |   |-- App.js
   |   |   |-- index.js
   |   |   |-- reportWebVitals.js
   |   |   |-- setupTests.js
   |-- flask-server
   |   |-- output-files
   |   |   |-- output.json
   |   |-- python-files
   |   |   |-- bbox__to_suburb.py
   |   |   |-- get_location.py
   |   |   |-- test-data
   |   |   |   |-- sal.json
   |   |   |   |-- tinyTwitter.json
   |   |   |   |-- twitter-data-small.json
   |   |   |-- twitter_process_v1.py
   |   |-- server.py
harvester
   |-- Dockerfile
   |-- ansible-scripts
   |   |-- inventory.yaml
   |   |-- playbook.yaml
   |   |-- roles
   |   |   |-- docker-build
   |   |   |   |-- tasks
   |   |   |   |   |-- main.yaml
   |   |   |-- harvester
   |   |   |   |-- tasks
   |   |   |   |   |-- main.yaml
   |   |-- run-playbook.sh
   |   |-- vars
   |   |   |-- hashtags.yaml
   |-- args.py
   |-- entrypoint.sh
   |-- harvester.py
   |-- output.txt
   |-- requirements.txt
   |-- secrets.sh
   |-- test.py
jupyter-notebooks
   |-- location_analysis.ipynb
requirements.txt
```