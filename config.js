// config.js

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  userDb: {
    host: process.env.USER_DB_HOST ,
    port: process.env.USER_DB_PORT ,
    user_port: process.env.USER_PORT,
    username: process.env.USER_DB_USERNAME ,
    password: process.env.USER_DB_PASSWORD ,
    database: process.env.USER_DB_DATABASE ,
  },
  orderDb: {
    host: process.env.ORDER_DB_HOST ,
    port: process.env.ORDER_DB_PORT,
    order_port: process.env.ORDER_PORT,
    username: process.env.ORDER_DB_USERNAME,
    password: process.env.ORDER_DB_PASSWORD ,
    database: process.env.ORDER_DB_DATABASE ,
  },
  productDb: {
    host: process.env.MONGO_DB , 
    database: process.env.MONGO_HOST 
    
  },
};
