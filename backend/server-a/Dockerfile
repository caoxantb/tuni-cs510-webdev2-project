# This is where you define the image for
# the server A, which implements the Swagger API.

# Start by copying the server stub to this directory.

# You should then use Noje image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.


FROM node:16

ENV APP_HOME=/app

ENV PORT=${PORT}
ENV MONGODB_URI=${MONGODB_URI}
ENV JWT_SECRET=${JWT_SECRET}
ENV COOKIE_SECRET=${COOKIE_SECRET}


WORKDIR ${APP_HOME}

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run"]