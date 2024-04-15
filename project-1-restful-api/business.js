
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

function addBusinessRoutes(app) {
  app.post('/businesses', attributeValidator(BUSINESS_ADD_REQS), (req, res) => {
    sendAppropriateResponse(req.body, BUSINESS_ADD_REQS, res)
  })

  // Modify  
  app.put('/businesses', (req, res) => {
    sendAppropriateResponse(req.body, BUSINESS_ADD_REQS, res)
  })

  // Remove 
  app.delete('/businesses/:businessId', validateBusinessId, (req, res) => {
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
