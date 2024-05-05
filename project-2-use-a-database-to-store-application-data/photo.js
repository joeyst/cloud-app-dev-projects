const mg = require('./mongoose_.js')
const Photo = mg.Photo

var getAttributeValidator = require('./util.js').getAttributeValidator

/*
The module is exported as addReviewRoutes. 
*/

function addPhotoRoutes(app) {
  // Add, modify, remove, get all: 
  app.post(  '/photos/:businessId', validateBusinessId, getAttributeValidator(PHOTO_ADD_REQS),    sendPhotoPostSuccessMessage)
  app.put(   '/photos/:photoId',    validatePhotoId,    getAttributeValidator(PHOTO_MODIFY_REQS), sendPhotoPutSuccessMessage)
  app.delete('/photos/:photoId',    validatePhotoId,                                               sendPhotoDeleteSuccessMessage) 
  app.get(   '/photos/:userId',     validateUserId,                                                sendPhotoGetAllFromUserSuccessMessage)
}

const PHOTO_ADD_REQS       = ["photo"]
const PHOTO_MODIFY_REQS    = ["photo"]

function getPhotoData(photoId) {
  return getPhotoDummyData()
}

/* Placeholder function */ 
function getPhotoDummyData() {
  return {
    "photo": "somePhoto",
    "caption": "someCaption",
  }
}

function getPhotoIdsFromUser(userId) {
  return getPhotoDummyIdAll()
}

function getPhotoDummyIdAll() {
  return [0]
}

function getPhotoDataAllFromUser(userId) {
  return getPhotoIdsFromUser(userId).map(id => getPhotoData(id))
}

function sendPhotoPostSuccessMessage(req, res) {
  res
    .status(200)
    .send(Model.find({ ... })) //`Successfully added photo ${JSON.stringify(req.body)} for business ID ${req.params.businessId}`)
}

function sendPhotoPutSuccessMessage(req, res) {
  res.status(200).send(`Successfully updated photo ${req.params.photoId}`)
}

function sendPhotoDeleteSuccessMessage(req, res) {
  res.status(200).send(`Successfully deleted photo ${req.params.photoId}`)
}

function sendPhotoGetAllFromUserSuccessMessage(req, res) {
  res.status(200).send(getPhotoDataAllFromUser(req.params.userId))
}

function isNumber(str) {
  return !isNaN(parseInt(str))
}

function validatePhotoId(req, res, next) {
  if (isNumber(req.params.photoId)) {
    next()
  } else {
    res.status(400).send(`${req.params.photoId} is not a valid ID.`)
  }
}

function validateBusinessId(req, res, next) {
  if (isNumber(req.params.businessId)) {
    next()
  } else {
    res.status(400).send(`${req.params.businessId} is not a valid ID.`)
  }
}

function validateUserId(req, res, next) {
  if (isNumber(req.params.userId)) {
    next()
  } else {
    res.status(400).send(`${req.params.userId} is not a valid ID.`)
  }
}

module.exports = addPhotoRoutes