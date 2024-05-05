
const mongoose = require('mongoose')

async function connectDb() {
  await mongoose.connect("mongodb://mongousername:mongopassword@database:27017/mongodatabasename", {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
}

const photoSchema = new mongoose.Schema({
  photo: String,
  caption: String,
})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = {
  connectDb: connectDb,
  Photo: Photo,
}