
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
