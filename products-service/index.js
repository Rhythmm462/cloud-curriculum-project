const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PRODUCT_PORT;
const mongoDbName = process.env.MONGO_DB;
const mongoURL = `mongodb://azure-mongodb:36Qy4ekB3NvcjsH1qhZEjmmj1MghcahLVm85nwyY43pFOboDfZJuhEJwYKw1ch7ckDqaynmAQWhuACDbd8Dc9Q==@azure-mongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@azure-mongodb@`;
const client = new MongoClient(mongoURL);

const getAllProducts = async (request, response) => {
  try {
    await client.connect();
    const collection = client.db(mongoDbName).collection('products');
    let results = await collection.find().toArray();

    response.send(results).status(200);
  } catch (error) {
    response.status(200).send(error);
  }
};

const All = async () => {
  await client.connect();
  const collection = client.db(mongoDbName).collection('products');
  return await collection.find().toArray();
};

const getAllProductsById = async (request, response) => {
  const id = request.params.id;

  const found = (await All()).find(
    (el) => el._id.toString() === id
  );

  if (!found) {
    response
      .status(404)
      .send(`Product with ID: ${id} cant not be found`);
  } else {
    response.status(200).send(found);
  }
};

const createAllProducts = async (request, response) => {
  const { name, description } = request.body;

  const found = (await All()).some((el) => el.name === name);

  if (name === undefined || description === undefined) {
    response
      .status(404)
      .send(`Bad request, please check your body parameter`);
  } else if (found) {
    response.status(400).send(`Product already exist`);
  } else {
    try {
      await client.connect();
      const collection = client
        .db(mongoDbName)
        .collection('products');
      let results = await collection.insertOne({ name, description });

      response
        .send(
          `Product with id: ${results.insertedId.toString()} added successfully`
        )
        .status(200);
    } catch (error) {
      response.send('Failed to add product').status(500);
    }
  }
};

const putAllProducts = async (request, response) => {
  const id = request.params.id;
  const { name, description } = request.body;
  const found = (await All()).find(
    (el) => el._id.toString() === id
  );

  if (!found) {
    response
      .status(404)
      .send(`Product with ID: ${id} cant not be found`);
  } else {
    try {
      await client.connect();
      const collection = client
        .db(mongoDbName)
        .collection('products');

      await collection.updateOne(
        {
          _id: found._id,
        },
        {
          $set: {
            name: name ?? found.name,
            description: description ?? found.description,
          },
        }
      );

      response.send(`Product updated successfully`).status(200);
    } catch (error) {
      response.send('Failed to Update product').status(500);
    }
  }
};

const deleteAllProducts = async (request, response) => {
  const id = request.params.id;

  const found = (await All()).find(
    (el) => el._id.toString() === id
  );

  if (!found) {
    response
      .status(404)
      .send(`Product with ID: ${id} cant not be found`);
  } else {
    try {
      await client.connect();
      const collection = client
        .db(mongoDbName)
        .collection('products');

      await collection.deleteOne({
        _id: new ObjectId(id),
      });

      response.send(`Product removed successfully`).status(200);
    } catch (error) {
      response.send('Failed to remove product').status(500);
    }
  }
};

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({
    info: 'Product service',
  });
});
app.get('/product', getAllProducts);
app.get('/product/:id', getAllProductsById);
app.post('/product', createAllProducts);
app.put('/product/:id', putAllProducts);
app.delete('/product/:id', deleteAllProducts);

app.listen(port, () => {
  console.log(`Product service running on port ${port}.`);
});
