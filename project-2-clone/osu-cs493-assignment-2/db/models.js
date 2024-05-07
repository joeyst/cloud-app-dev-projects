
const mongoose = require('mongoose')

const MONGO_INITDB_ROOT_USERNAME=process.env.MONGO_INITDB_ROOT_USERNAME
const MONGO_INITDB_ROOT_PASSWORD=process.env.MONGO_INITDB_ROOT_PASSWORD
const MONGO_INITDB_DATABASE=process.env.MONGO_INITDB_DATABASE
const MONGO_PORT=process.env.MONGO_PORT

async function connectDb() {
  await mongoose.connect(`mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@database:${MONGO_PORT}/${MONGO_INITDB_DATABASE}`, {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
}
const db_ = connectDb()

var nextPhotoId = 0
var nextReviewId = 0
var nextBusinessId = 0

const photoSchema = new mongoose.Schema({
  _id: Number,
  photo: String,
  caption: {type: String, required: false}, // | null,
  userid: Number,
}, { _id: false })

const Photo = mongoose.model('Photo', photoSchema)

const reviewSchema = new mongoose.Schema({
  _id: Number,
  userid: Number,
  businessid: Number,
  starRating: Number,
  dollarSignRating: Number,
  writtenReview: {type: String, required: false} // | null,
}, { _id: false })

const Review = mongoose.model('Review', reviewSchema)

const businessSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  streetAddress: String,
  city: String,
  state: String,
  zip: String,
  phoneNumber: String,
  category: String,
  subcategories: [String],
  website: {type: String, required: false}, // | null,
  email: {type: String, required: false} // | null,
}, { _id: false })

const Business = mongoose.model('Business', businessSchema)

function getPhotoDocument(req) {
  const { photo, caption, userid } = req.body 
  const photoId = nextPhotoId
  nextPhotoId += 1
  return new Photo(Object.assign(req.body, {_id: photoId})) //photoId, photo, caption, userid)
}

function getReviewDocument(req) {
  const { userid, businessid, starRating, dollarSignRating, writtenReview } = req.body 
  const reviewId = nextReviewId
  nextReviewId += 1
  return new Review(Object.assign(req.body, {_id: reviewId})) //reviewId, userid, businessid, starRating, dollarSignRating, writtenReview)
}

function getBusinessDocument(req) {
  try {
  const businessId = nextBusinessId
  nextBusinessId += 1
  return new Business(Object.assign(req.body, {_id: businessId})) //businessId, name, streetAddress, city, state, zip, phoneNumber, category, subcategories, website, email)
  }
  catch (err) {
    console.log(`ERROR: ${err}`)
  }
}

module.exports = {
  Photo: Photo,
  Review: Review,
  Business: Business,
  getPhotoDocument,
  getReviewDocument,
  getBusinessDocument,
}