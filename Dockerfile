FROM node:6.9.4

ADD app /app

WORKDIR /app
RUN npm install

RUN npm test
