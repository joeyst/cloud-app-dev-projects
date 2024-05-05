
var getAttributeValidator = require('./util.js').getAttributeValidator

/*
The module is exported as addBusinessRoutes. 
*/

function addBusinessRoutes(app) {
  // Add, modify, remove, get all, get (respectively): 
  app.post(  '/businesses',                                 getAttributeValidator(BUSINESS_ADD_REQS),    sendBusinessPostSuccessMessage)
  app.put(   '/businesses/:businessId', validateBusinessId, getAttributeValidator(BUSINESS_MODIFY_REQS), sendBusinessPutSuccessMessage)
  app.delete('/businesses/:businessId', validateBusinessId,                                              sendBusinessDeleteSuccessMessage) 
  app.get(   '/businesses',                                                                              sendBusinessGetAllSuccessMessage)
  app.get(   '/businesses/:businessId', validateBusinessId,                                              sendBusinessGetSuccessMessage)
}



const BUSINESS_ADD_REQS    = ["name", "streetAddress", "city", "state", "zip", "phoneNumber", "category", "subcategories"]
const BUSINESS_MODIFY_REQS = ["name", "streetAddress", "city", "state", "zip", "phoneNumber", "category", "subcategories"]

function getBusinessData(businessId) {
  return getBusinessDummyData()
}

/* Placeholder function */ 
function getBusinessDummyData() {
  return {
    "name": "someName",
    "streetAddress": "someStreetAddress",
    "city": "someCity",
    "state": "someState",
    "zip": "someZip",
    "phoneNumber": "somePhoneNumber",
    "category": "someCategory",
    "subcategories": ["someSubcategory1", "someSubcategory2"],
    "website": "someWebsite.someTopLevelDomain",
    "email": "someEmail@someDomain",
  }
}

function getBusinessIds() {
  return getBusinessDummyIdAll()
}

function getBusinessDummyIdAll() {
  return [0]
}

function getBusinessDataAll() {
  return getBusinessIds().map(id => getBusinessData(id))
}

function sendBusinessPostSuccessMessage(req, res) {
  res.status(200).send(`Successfully added business ${JSON.stringify(req.body)}`)
}

function sendBusinessPutSuccessMessage(req, res) {
  res.status(200).send(`Successfully updated business ${req.params.businessId}`)
}

function sendBusinessDeleteSuccessMessage(req, res) {
  res.status(200).send(`Successfully deleted business ${req.params.businessId}`)
}

function sendBusinessGetAllSuccessMessage(req, res) {
  res.status(200).send(getBusinessDataAll())
}

function sendBusinessGetSuccessMessage(req, res) {
  res.status(200).send(getBusinessData(req.params.businessId))
}

function isNumber(str) {
  return !isNaN(parseInt(str))
}

function validateBusinessId(req, res, next) {
  if (isNumber(req.params.businessId)) {
    next()
  } else {
    res.status(400).send(`${req.params.businessId} is not a valid ID.`)
  }
}

module.exports = addBusinessRoutes