# Stage 1: Build the Angular app
FROM node:18 as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your source code and build the Angular app in production mode
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the Angular build output into Nginx's html directory.
# If your build output is in /app/dist/frontend/browser/, adjust as follows:
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
