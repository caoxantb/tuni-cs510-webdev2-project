# This is where you define the image for
# the server B which processes the orders.

# You should then use Noje image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

#FROM node:version...

# Use the official Node.js 16 image
FROM node:16

# Set the working directory inside the container
ENV APP_HOME=/app

# Copy package.json and package-lock.json files to the working directory
WORKDIR ${APP_HOME}

# Install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Make the wait-for-it.sh script executable
RUN chmod +x ./utils/wait-for-it.sh

# Command to start the application
CMD ["npm", "start"]