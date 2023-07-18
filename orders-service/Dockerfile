FROM node:18-alpine as base

ENV ORDER_PORT=3001

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3001

# CMD npm start
CMD [ "node", "index.js" ]