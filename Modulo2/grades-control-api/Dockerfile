### STAGE 1: build-stage-1 ###
FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

WORKDIR /app
EXPOSE 3001
CMD ["npm", "run", "start:prod"]