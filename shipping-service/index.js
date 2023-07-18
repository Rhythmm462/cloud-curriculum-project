const amqplib = require('amqplib');

(async () => {
  const connection = await amqplib.connect(
    process.env.AMQP_URL
  );
  const channel = await connection.createChannel();
  const queue = 'sendOrderToShipping';

  channel.prefetch(10);

  // process.once('SIGINT', async () => {
  //   console.log('got sigint, closing connection');
  //   await channel.close();
  //   await connection.close();
  //   process.exit(0);
  // });

  await channel.assertQueue(queue, { durable: true });
  await channel.consume(
    queue,
    async (msg) => {
      console.log('processing messages');
      console.log(msg.content.toString(), 'Order received');
      await channel.ack(msg);
    },
    connection.on('error', (error) => {
      console.error('RabbitMQ connection error:', error);
    }));
    
    channel.on('error', (error) => {
      console.error('RabbitMQ channel error:', error);
    });
    process.on('SIGINT', async () => {
      await channel.close();
      await connection.close();
      process.exit(0);
    });
  

  console.log(' Awaiting Messages');
})();
