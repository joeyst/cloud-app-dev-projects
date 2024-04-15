
var getAttributeValidator = require('./util.js').getAttributeValidator

/*
The module is exported as addReviewRoutes. 
*/

function addReviewRoutes(app) {
  // Add, modify, remove, get all: 
  app.post(  '/reviews/:businessId', validateBusinessId, getAttributeValidator(REVIEW_ADD_REQS),    sendReviewPostSuccessMessage)
  app.put(   '/reviews/:reviewId',   validateReviewId,   getAttributeValidator(REVIEW_MODIFY_REQS), sendReviewPutSuccessMessage)
  app.delete('/reviews/:reviewId',   validateReviewId,                                              sendReviewDeleteSuccessMessage) 
  app.get(   '/reviews/:userId',     validateUserId,                                                sendReviewGetAllFromUserSuccessMessage)
}

const REVIEW_ADD_REQS    = ["starRating", "dollarSignRating"]
const REVIEW_MODIFY_REQS = ["starRating", "dollarSignRating"]

function getReviewData(reviewId) {
  return getReviewDummyData()
}

/* Placeholder function */ 
function getReviewDummyData() {
  return {
    "starRating": "someStarRating",
    "dollarSignRating": "someDollarSignRating",
    "writtenReview": "someWrittenReview",
  }
}

function getReviewIdsFromUser(userId) {
  return getReviewDummyIdAll()
}

function getReviewDummyIdAll() {
  return [0]
}

function getReviewDataAllFromUser(userId) {
  return getReviewIdsFromUser(userId).map(id => getReviewData(id))
}

function sendReviewPostSuccessMessage(req, res) {
  res.status(200).send(`Successfully added review ${req.body} for business ID ${req.params.businessId}`)
}

function sendReviewPutSuccessMessage(req, res) {
  res.status(200).send(`Successfully updated review ${req.params.reviewId}`)
}

function sendReviewDeleteSuccessMessage(req, res) {
  res.status(200).send(`Successfully deleted review ${req.params.reviewId}`)
}

function sendReviewGetAllFromUserSuccessMessage(req, res) {
  res.status(200).send(getReviewDataAllFromUser(req.params.userId))
}

function isNumber(str) {
  return !isNaN(parseInt(str))
}

function validateReviewId(req, res, next) {
  if (isNumber(req.params.reviewId)) {
    next()
  } else {
    res.status(404).send(`${req.params.reviewId} is not a valid ID.`)
  }
}

module.exports = addReviewRoutes