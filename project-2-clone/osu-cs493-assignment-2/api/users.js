const router = require('express').Router();

const crud = require('../db/crud.js')

exports.router = router;

/*
 * Route to list all of a user's businesses.
 */
router.get('/:userid/businesses', function (req, res) {
  res.send(crud.getUserBusinessList(req, res))
});

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userid/reviews', function (req, res) {
  res.send(crud.getUserReviewList(req, res))
});

/*
 * Route to list all of a user's photos.
 */
router.get('/:userid/photos', function (req, res) {
  res.send(crud.getUserPhotoList(req, res))
});
