# Stage 1: Build the Angular app
# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build -- --configuration production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
WORKDIR /app
COPY dist/storekeeper-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
