
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

function sendBusinessDeleteSuccessMessage(req, res) {
  res.status(200).send(`Successfully added business ${req.params.busnessId}`)
}

function isNumber(str) {
  return !isNan(parseInt(str))
}

function validateBusinessId(req, res) {
  if (isNumber(req.params.businessId)) {
    next()
  } else {
    res.status(404).send(`${req.params.businessId} is not a valid ID.`)
  }
}

function addBusinessRoutes(app) {
  // Add 
  app.post('/businesses', getAttributeValidator(BUSINESS_ADD_REQS), sendBusinessPostSuccessMessage)

  // Modify  
  app.put('/businesses/:businessId', validateBusinessId, getAttributeValidator(BUSINESS_MODIFY_REQS), sendBusinessSuccessMessage)

  // Remove 
  app.delete('/businesses/:businessId', validateBusinessId, sendBusinessDeleteSuccessMessage) getAttributeValidator(BUSS (req, res) => {
    if (isValidBusinessId(req.params.businessId)) {
      res.status(200).send("Success!")
    } else {
      res.status(400).send(`Invalid businessId ${businessId}`)
    }
  })

  // Get all  
  app.get('/businesses', (req, res) => {
    // TODO: Send back dummy data. 
  })

  // Get 
  app.get('/businesses/:businessId', (req, res) => {
    if (isValidBusinessId(req.params.businessId)) {
      res.status(200).send("Success!") // TODO: Send back dummy data. 
    } else {
      res.status(400).send(`Invalid businessId ${businessId}`)
    }
  })
}

module.exports = addBusinessRoutes