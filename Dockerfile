FROM node:lts-alpine

RUN mkdir -p /usr/api
WORKDIR /usr/api
COPY . .
RUN npm install