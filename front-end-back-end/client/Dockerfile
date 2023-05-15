# taken from https://typeofnan.dev/how-to-serve-a-react-app-with-nginx-in-docker/

# #RUN npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
# #RUN npm ci --legacy-peer-deps

FROM node AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN npm install --legacy-peer-deps
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]