const sizeOf = require('image-size');
const amqp = require('amqplib');
const Jimp = require("jimp");

const { uploadToBucket, uploadThumbnail } = require("./gridFs")
// uploadToBucket(bucketName, src, dest, metadata) 
// uploadThumbnail(image, dest, metadata) 
const { connectToDb } = require('./lib/mongo')

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
    channel.consume(queueName, async (msg) => {
      if (msg) {
        const id = msg.content.toString();
        console.log("CONSUMER REACHED getDownloadStreamById")
        const downloadStream = await getDownloadStreamById(id);

        const imageData = [];
        downloadStream.on('data', (data) => {
          console.log("CONSUMER REACHED downloadStream.on('data', ...)")
          imageData.push(data);
        });
        
        downloadStream.on('end', async () => {
          console.log("CONSUMER REACHED downloadStream.on")
          const image = Buffer.concat(imageData)
          const imageDimensions = sizeOf(image)

          console.log("CONSUMER REACHED updateImageAttributeById")
          await updateImageAttributeById(id, "dimensions", imageDimensions);
          const { filename } = getImageInfoById(id)
          console.log("CONSUMER REACHED uploadThumbnail")
          await uploadThumbnail(image, id, filename)
          console.log("CONSUMER REACHED updateImageAttributeById")
          await updateImageAttributeById(id, "thumbId", id) // <= this feels redundant to me, but iiuc the instructions, it was included, potentially for posterity of explicitly saying what the corresponding thumbId is. 
          const result = await getImageInfoById(id)
          console.log(`RESULT: ${JSON.stringify(result)}`)
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
connectToDb(main) // Is there another way to connect to the database that doesn't use an API endpoint directly? Not sure if this is correct. 
