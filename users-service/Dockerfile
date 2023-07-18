FROM node:18-alpine as base

ENV USER_PORT=3002

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3002

# CMD npm start
CMD [ "node", "index.js" ]
