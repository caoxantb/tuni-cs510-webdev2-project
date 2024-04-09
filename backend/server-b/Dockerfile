# This is where you define the image for
# the server B which processes the orders.

# You should then use Noje image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

#FROM node:version...

FROM node:16

ENV APP_HOME=/app

WORKDIR ${APP_HOME}

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./utils/wait-for-it.sh

CMD ["npm", "start"]