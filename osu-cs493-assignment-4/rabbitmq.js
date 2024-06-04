const amqp = require('amqplib');
const rabbitmqHost = process.env.RABBITMQ_HOST;
const rabbitmqUrl = `amqp://${rabbitmqHost}`;

export function getChannel() {
  const connection = await amqp.connect(rabbitmqUrl);
  return await connection.createChannel();
}

export function sendIdToQueue(id) {
  getChannel().sendToQueue('images', Buffer.from(id.toString()))
}
