var util = require('./util.js'); 
var getAttributeValidator = util.getAttributeValidator
var addBusinessRoutes = require('./business.js')
var addReviewRoutes = require('./review.js')
var addPhotoRoutes = require('./photo.js')

var express = require('express');
var app = express();

const port = 3030

/* Taken from module: */
app.listen(port, function () {
    console.log("== Server is listening on port", port);
});

addBusinessRoutes(app)
addReviewRoutes(app)
addPhotoRoutes(app)

/* Taken from module: */
app.use('*', function (req, res) {
    res.status(404).send({
        err: "The requested resource doesn't exist"
    });
});
