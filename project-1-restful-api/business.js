
var getAttributeValidator = require('./util.js').getAttributeValidator

/*
The module is exported as addBusinessRoutes. 
*/

function addBusinessRoutes(app) {
  // Add 
  app.post('/businesses',                                   getAttributeValidator(BUSINESS_ADD_REQS),    sendBusinessPostSuccessMessage)

  // Modify  
  app.put('/businesses/:businessId',    validateBusinessId, getAttributeValidator(BUSINESS_MODIFY_REQS), sendBusinessPutSuccessMessage)

  // Remove 
  app.delete('/businesses/:businessId', validateBusinessId,                                              sendBusinessDeleteSuccessMessage) 

  // Get all  
  app.get('/businesses',                                                                                 sendBusinessGetAllSuccessMessage)

  // Get 
  app.get('/businesses/:businessId',    validateBusinessId,                                              sendBusinessGetSuccessMessage)
}



const BUSINESS_ADD_REQS = ["name", "street_address", "city", "state", "zip", "phone_number", "category", "subcategories"]
const BUSINESS_MODIFY_REQS = ["name", "street_address", "city", "state", "zip", "phone_number", "category", "subcategories"]
const BUSINESS_DELETE_REQS = ["businessId"]
const BUSINESS_GET_REQS = ["businessId"]
const BUSINESS_GET_ALL_REQS = []

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
  res.status(200).send(`Successfully added business ${req.body}`)
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
    res.status(404).send(`${req.params.businessId} is not a valid ID.`)
  }
}

module.exports = addBusinessRoutes