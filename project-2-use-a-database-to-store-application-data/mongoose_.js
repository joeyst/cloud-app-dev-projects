
const mongoose = require('mongoose')

async function connectDb() {
  await mongoose.connect("mongodb://mongousername:mongopassword@database:27017/mongodatabasename", {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
}

module.exports = {
  connectDb: connectDb
}