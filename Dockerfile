FROM node:lts-alpine

RUN mkdir -p /usr/api
WORKDIR /usr/api
RUN adduser -S api
COPY . .
RUN npm install
RUN chown -R api ./usr/api
USER api