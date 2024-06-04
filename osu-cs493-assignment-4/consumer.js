const sizeOf = require('image-size');
const amqp = require('amqplib');
const Jimp = require("jimp");

const { uploadToBucket, uploadThumbnail } = require("./gridFs")
// uploadToBucket(bucketName, src, dest, metadata) 
// uploadThumbnail(image, dest, metadata) 

const rabbitmqHost = process.env.RABBITMQ_HOST;
const rabbitmqUrl = `amqp://${rabbitmqHost}`;
const queueName = "images"

const { getDownloadStreamById } = require('./models/photo')

async function updateImageSizeById(id, dimensions) {

}

async function main() {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
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

          await updateImageSizeById(id, imageDimensions);
          const { businessId, ... } = ...
          uploadThumbnail(image, ..., { businessId, ...})
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
