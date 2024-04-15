var util = require('./util.js'); 
var getAttributeValidator = util.getAttributeValidator

var express = require('express');
var app = express();

const port = 3030

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});

function sendAppropriateResponse(obj, attrs, res, success_msg="Success!") {
  if (hasAll(obj, attrs)) {
    res.status(200).send(success_msg)
  } else {
    res.status(400).send(`Missing keys: ${getAllNotIn(Object.keys(obj), attrs)}`)
  }
}

// Placeholder function 
function getIfBusinessIdValidFromDatabase(id) {
  return true
}

function isValidBusinessId(id) {
  if (isNan(parseInt(id))) {
    return false
  } else {
    return getIfBusinessIdValidFromDatabase(id)
  }
}

function validateBusinessId(req, res, next) {

}

function sendDeleteMessage(req, res) {
  res.status(200).send("Deleted!")
}

app.get('*', (req, res) => {
  res.status(200).send("Success!")
})

/* Businesses */ 

// Add 
const BUSINESS_ADD_REQS = ["name", "street_address", "city", "state", "zip", "phone_number", "category", "subcategories"]
app.post('/businesses', getAttributeValidator(BUSINESS_ADD_REQS), (req, res) => {
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

/* Reviews */

// Add 
app.post('/reviews', (req, res) => {

})

// Modify 
app.post('/reviews', (req, res) => {

})

// Remove 
app.post('/reviews', (req, res) => {

})

// Get all 
app.post('/reviews', (req, res) => {

})

/* Photos */ 

// Add 
app.post('/photos', (req, res) => {

})

// Modify  
app.post('/photos', (req, res) => {

})

// Remove 
app.post('/photos', (req, res) => {

})

// Get all 
app.post('/photos', (req, res) => {

})

// app.use()