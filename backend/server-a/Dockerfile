# This is where you define the image for
# the server A, which implements the Swagger API.

# Start by copying the server stub to this directory.

# You should then use Noje image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

# Use the official Node.js 16 image
FROM node:16

# Set the working directory inside the container
ENV APP_HOME=/app
WORKDIR ${APP_HOME}

# Set environment variables for application configuration
ENV PORT=${PORT}
ENV MONGODB_URI=${MONGODB_URI}
ENV JWT_SECRET=${JWT_SECRET}
ENV COOKIE_SECRET=${COOKIE_SECRET}

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port specified by the PORT environment variable
EXPOSE ${PORT}

# Make the wait-for-it.sh script executable
RUN chmod +x ./utils/wait-for-it.sh

# Command to start the application
CMD ["npm", "start"]