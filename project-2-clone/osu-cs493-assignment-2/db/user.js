const { Business, Photo, Review } = require('./models.js')

async function getUserBusinessList(req, res) {
  res.send(await Business.find({userid: req.params.userid}))
}

async function getUserReviewList(req, res) {
  res.send(await Review.find({userid: req.params.userid}))
}

async function getUserPhotoList(req, res) {
  res.send(await Photo.find({userid: req.params.userid}))
}

module.exports = {
  getUserBusinessList: getUserBusinessList,
  getUserReviewList: getUserReviewList,
  getUserPhotoList: getUserPhotoList,
}