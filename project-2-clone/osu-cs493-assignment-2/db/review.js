const { Review, getReviewDocument } = require('./models.js')

function postReview(req, res) {
  getReviewDocument(req).save(err => {
    if (err) {
      res.status(400).send()
    } else {
      console.log("Review saved!")
      res.status(200).send()
    }
  })
}

async function getReview(req, res) {
  res.send(await Review.findById(req.params.reviewId).then(instance => instance.toJSON()))
}

async function putReview(req, res) {
  res.send(await Review.findByIdAndUpdate(req.params.reviewId, req.body, { new: true }).then(instance => instance.toJSON()))
}

async function deleteReview(req, res) {
  await Review.findByIdAndDelete(req.params.reviewId)
  res.send("Review deleted!")
}

module.exports = {
  postReview: postReview,     // /
  getReview: getReview,       // /:reviewID
  putReview: putReview,       // /:reviewID
  deleteReview: deleteReview, // /:reviewID
}