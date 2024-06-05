const sizeOf = require('image-size');
const amqp = require('amqplib');
const Jimp = require("jimp");

const { uploadToBucket, uploadThumbnail } = require("./gridFs")
// uploadToBucket(bucketName, src, dest, metadata) 
// uploadThumbnail(image, dest, metadata) 

const rabbitmqHost = process.env.RABBITMQ_HOST;
const rabbitmqUrl = `amqp://${rabbitmqHost}`;
const queueName = "images"

const { getDownloadStreamById, getImageInfoById } = require('./models/photo')

const { updateImageAttributeById } = require('./lib/mongo')

async function main() {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    console.log("%c consumer connected to RabbitMQ.", "color:green")
    channel.consume(queueName, (msg) => {
      if (msg) {
        const id = msg.content.toString();
        const downloadStream = getDownloadStreamById(id);

        const imageData = [];
        downloadStream.on('data', (data) => {
          imageData.push(data);
        });
        
        downloadStream.on('end', async () => {
          const image = Buffer.concat(imageData)
          const imageDimensions = sizeOf(image)

          updateImageAttributeById(id, "dimensions", imageDimensions);
          const { filename } = getImageInfoById(id)
          uploadThumbnail(image, id, filename)
          updateImageAttributeById(id, "thumbId", id) // <= this feels redundant to me, but iiuc the instructions, it was included, potentially for posterity of explicitly saying what the corresponding thumbId is. 
        });
        console.log(msg.content.toString());
      }
        channel.ack(msg);
      });
  } catch (err) {
    console.error(err);
    throw new Error("consumer.js error.")
  }
}
main();
