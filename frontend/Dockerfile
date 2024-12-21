# Stage 1: Build React app
FROM node:18 as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --package-lock-only && npm ci
COPY . .
RUN NODE_ENV=production npm run build

# Stage 2: Serve React app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
