const amqp = require('amqplib');
const rabbitmqHost = process.env.RABBITMQ_HOST;
const rabbitmqUrl = `amqp://${rabbitmqHost}`;

async function getChannel() {
  const connection = await amqp.connect(rabbitmqUrl);
  return await connection.createChannel();
}

async function sendIdToQueue(id) {
  await getChannel().then(channel => channel.sendToQueue('images', Buffer.from(id.toString())))
}

module.exports = {
  getChannel,
  sendIdToQueue,
}
