FROM node:latest
WORKDIR /app

COPY . ./
RUN npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
RUN npm ci --legacy-peer-deps
ENTRYPOINT ["/app/start-frontend.sh"]
