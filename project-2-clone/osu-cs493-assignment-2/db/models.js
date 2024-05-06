
const mongoose = require('mongoose')

async function connectDb() {
  await mongoose.connect("mongodb://mongousername:mongopassword@database:27017/mongodatabasename", {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
}
const db_ = connectDb()

const photoSchema = new mongoose.Schema({
  photo: String,
  caption: String, // | null,
  userId: Number,
})

const Photo = mongoose.model('Photo', photoSchema)

const reviewSchema = new mongoose.Schema({
  starRating: Number,
  dollarSignRating: Number,
  writtenReview: String // | null,
})

const Review = mongoose.model('Review', reviewSchema)

const businessSchema = new mongoose.Schema({
  name: String,
  streetAddress: String,
  city: String,
  state: String,
  zip: String,
  phoneNumber: String,
  category: String,
  subcategories: [String],
  website: String, // | null,
  email: String // | null,
})

const Business = mongoose.model('Business', businessSchema)

module.exports = {
  Photo: Photo,
  Review: Review,
  Business: Business,
}