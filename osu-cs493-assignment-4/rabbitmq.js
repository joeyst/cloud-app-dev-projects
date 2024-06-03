const amqp = require('amqplib');
const rabbitmqHost = process.env.RABBITMQ_HOST;
const rabbitmqUrl = `amqp://${rabbitmqHost}`;

const connection = await amqp.connect(rabbitmqUrl);
const channel = await connection.createChannel();

function getChannel() {
  return channel 
}

module.exports = getChannel 