var express = require('express');
var app = express();

const port = 3030

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});

/* Businesses */ 

// Add 
app.post('/businesses', (req, res) => {

})

// Modify  
app.post('/businesses', (req, res) => {

})

// Remove 
app.post('/businesses', (req, res) => {

})

// Get all  
app.post('/businesses', (req, res) => {

})

// Get 
app.post('/businesses', (req, res) => {

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

/*
const express = require('express');
const app = express();
const PORT = 3000;
 
app.post('/',
    (req, res) => {
        res.send("POST Request Called")
    })
 
app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });
*/