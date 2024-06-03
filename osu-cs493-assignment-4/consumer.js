const sizeOf = require('image-size');
const amqp = require('amqplib');
const rabbitmqHost = process.env.RABBITMQ_HOST;
const rabbitmqUrl = `amqp://${rabbitmqHost}`;

async function main() {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue('echo');
    channel.consume(queue, (msg) => {
      if (msg) {
        const id = msg.content.toString();
        const downloadStream = getDownloadStreamById(id);

        const imageData = [];
        downloadStream.on('data', (data) => {
          imageData.push(data);
        });

        downloadStream.on('end', async () => {
          const dimensions = sizeOf(Buffer.concat(imageData));
          const result = await updateImageSizeById(id, dimensions);
          // TODO: What is result doing here? 
        });
        console.log(msg.content.toString());
      }
        channel.ack(msg);
      });
  } catch (err) {
    console.error(err);
  }
}
main();
