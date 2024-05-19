const { Router } = require('express')

const { Business } = require('../models/business')
const { Photo } = require('../models/photo')
const { Review } = require('../models/review')
const { User } = require('../models/user')

const router = Router()

const secret_key = process.env.APP_SECRET_KEY;

/*
 * Route to create new account from user name, email, and password. 
 */
// TODO: Do we need to return the ID here? 
router.post('/', async function (req, res) {
  const existingUser = await User.findOne({ where: { email: req.body.email }})
  if (!(existingUser == null)) {
    res.status(401).send(`User with email ${email} already exists.`)
    return
  }

  await User.create(Object.assign(req.body, {admin: false}), UserClientFields)
  res.status(200).send("Created user!")
})

/* 
 * Route to get JWT from user email and password. 
 */
router.post('/login', async function (req, res) {
  const { email, password } = req.params
  const user = await User.findOne({ where: { email: email }, attributes: ['id', 'name', 'email'] })

  if (user == null) {
    res.status(401).send(`Unable to find email ${email}`)
    return
  }

  if (!user.validPassword(password)) {
    res.status(401).send(`Unable to find password ${password}`)
    return
  }

  const token = jwt.sign(user.toJSON(), secret_key)
  res.status(200).json({token})
})

/* 
 * Route to get user information excluding password. 
 */
router.get('/users/:userId', async function (req, res) {
  const user = await User.findByPk(req.query.userId, { attributes: ['name', 'email', 'id', 'admin'] })
  if (user == null) {
    res.status(401).send(`Unable to find user with ID ${req.query.userId}`)
    return
  }
  res.status(200).json(user.toJSON())
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
