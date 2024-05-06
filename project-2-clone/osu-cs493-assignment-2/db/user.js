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

/*
async function postUser(req, res) {
  new User(req.body).save(err => {
    if (err) {
      res.status(400).send()
    } else {
      console.log("User saved!")
      res.status(200).send()
    }
  })
}

async function getUser(req, res) {
  res.send(await User.findById(req.params.userId))
}

async function putUser(req, res) {
  res.send(await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }))
}

async function deleteUser(req, res) {
  await User.findByIdAndDelete(req.params.userId)
  res.send("User deleted!")
}
*/

module.exports = {
  // postUser: postUser,     // /
  // getUser: getUser,       // /:UserID
  // putUser: putUser,       // /:UserID
  // deleteUser: deleteUser, // /:UserID
  getUserBusinessList: getUserBusinessList,
  getUserReviewList: getUserReviewList,
  getUserPhotoList: getUserPhotoList,
}