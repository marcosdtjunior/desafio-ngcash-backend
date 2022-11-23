FROM node:latest

RUN mkdir -p /usr/api
WORKDIR /usr/api
COPY package.json tsconfig.json .env .eslintrc.json ./
COPY ./src ./src
RUN npm install