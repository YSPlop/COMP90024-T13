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
