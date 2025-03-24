#Dockerfile
# Stage 1: Build the React app
FROM node:18.15-alpine as build

# Create the directory where the app will live
RUN mkdir -p /app

# Set /app as the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies in /app
RUN npm install

# Copy the rest of the project files into /app
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build folder from the previous stage to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]







# #prefered node version:
# FROM node:18.15-alpine

# #Create the directory on the node image where the app will live:
# RUN mkdir -p/app

# #Set /app as the working directory in container 
# WORKDIR /app

# #Copy package.json and package-lock.json to the /app working directory 
# COPY package*.json ./

# #Install dependencies in /app
# RUN nmp Install

# #Copy the rest of our folder into /app
# COPY . . 

# #Ensure port 8080 is accessible to our system:
# EXPOSE 8080

# #Run dev, as we would via CMD
# CMD npm run dev


