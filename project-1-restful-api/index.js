var util = require('./util.js'); 
var getAttributeValidator = util.getAttributeValidator
var addBusinessRoutes = require('./business.js')

var express = require('express');
var app = express();

const port = 3030

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});

addBusinessRoutes(app)

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