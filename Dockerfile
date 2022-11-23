FROM node:latest

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api
COPY package.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]