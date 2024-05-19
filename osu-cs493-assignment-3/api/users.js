const { Router } = require('express')

const { Business } = require('../models/business')
const { Photo } = require('../models/photo')
const { Review } = require('../models/review')

const router = Router()

const secret_key = process.env.APP_SECRET_KEY;

/*
 * TODO: Add POST /users with provided name, email address, and password, and salted and hashed password on server before storing it.
 */
router.post('/', async function (req, res) {
  const { id, name, email, password, admin } = req.params
  const user = await User.find({ where: { email: email }})

  if (user == null) {
    res.status(401).send(`Unable to find email ${email}`)
    return
  }

  if (!user.validPassword(password)) {
    res.status(401).send(`Unable to find password ${password}`)
    return
  }

  const token = jwt.sign({ id: id, name: name, email: email }, secret_key)
  res.status(200).json({token})
})

/*
 * Route to list all of a user's businesses.
 */
router.get('/:userId/businesses', async function (req, res) {
  const userId = req.params.userId
  const userBusinesses = await Business.findAll({ where: { ownerId: userId }})
  res.status(200).json({
    businesses: userBusinesses
  })
})

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userId/reviews', async function (req, res) {
  const userId = req.params.userId
  const userReviews = await Review.findAll({ where: { userId: userId }})
  res.status(200).json({
    reviews: userReviews
  })
})

/*
 * Route to list all of a user's photos.
 */
router.get('/:userId/photos', async function (req, res) {
  const userId = req.params.userId
  const userPhotos = await Photo.findAll({ where: { userId: userId }})
  res.status(200).json({
    photos: userPhotos
  })
})

module.exports = router
