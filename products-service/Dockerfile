FROM node:18-alpine as base

ENV PRODUCT_PORT=3003
ENV MONGO_DB: mongodb
ENV MONGO_URL: mongodb://azure-mongodb:36Qy4ekB3NvcjsH1qhZEjmmj1MghcahLVm85nwyY43pFOboDfZJuhEJwYKw1ch7ckDqaynmAQWhuACDbd8Dc9Q==@azure-mongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@azure-mongodb@

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3003

# CMD npm start
CMD [ "node", "index.js" ]