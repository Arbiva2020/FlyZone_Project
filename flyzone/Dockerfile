#Dockerfile
#prefered node version:
FROM node:18.15-alpine

#Create the directory on the node image where the app will live:
RUN mkdir -p/app

#Set /app as the working directory in container 
WORKDIR /app

#Copy package.json and package-lock.json to the /app working directory 
COPY package*.json ./

#Install dependencies in /app
RUN nmp Install

#Copy the rest of our folder into /app
COPY . . 

#Ensure port 8080 is accessible to our system:
EXPOSE 8080

#Run dev, as we would via CMD
CMD npm run dev


