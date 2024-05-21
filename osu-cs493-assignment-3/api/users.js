const { Router } = require('express')
const bcrypt = require('bcrypt')

const { Business } = require('../models/business')
const { Photo } = require('../models/photo')
const { Review } = require('../models/review')
const { User, UserClientFields, isAdmin } = require('../models/user')
const jwt = require('jsonwebtoken')

const requireAuthentication = require('../lib/requireAuthentication')

const router = Router()

const secret_key = process.env.APP_SECRET_KEY

async function isValidUrlUserId(req, res, next) {
  if (isAdmin(req)) {
    next()
    return
  }

  if (req.user.id == req.params.userId) {
    next()
    return
  }

  res.status(401).send("Invalid credentials.")
}

/*
 * Route to create new account from user name, email, and password. 
 */
// TODO: If req.body includes admin attribute, just overwrite, or return error? 
router.post('/', async function (req, res) {
  const existingUser = await User.findOne({ where: { email: req.body.email }})
  if (!(existingUser == null)) {
    res.status(401).send(`User with email ${req.body.email} already exists.`)
    return
  }

  const user = await User.create(Object.assign(req.body, {admin: false}), UserClientFields)
  res.status(201).send({id: user.toJSON().id})
})

/* 
 * Route to get JWT from user email and password. 
 */
router.post('/login', async function (req, res) {
  const { email, password } = req.body
  console.log(`email: ${email} | password: ${password}`)
  const user = await User.findOne({ where: { email: email }, attributes: UserClientFields })

  if (user == null) {
    res.status(401).send(`Unable to find email ${email}`)
    return
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(401).send(`Incorrect password ${password}`)
    return
  }

  const { name_, email_, id_ } = user.toJSON()
  
  const token = jwt.sign({name: name_, email: email_, id: id_}, secret_key)
  res.status(200).send({token: token})
})

/* 
 * Route to get user information excluding password. 
 */
router.get('/:userId', requireAuthentication, isValidUrlUserId, async function (req, res) {
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
router.get('/:userId/businesses', requireAuthentication, isValidUrlUserId, async function (req, res) {
  const userId = req.params.userId
  const userBusinesses = await Business.findAll({ where: { ownerId: userId }})
  res.status(200).json({
    businesses: userBusinesses
  })
})

/*
 * Route to list all of a user's reviews.
 */
router.get('/:userId/reviews', requireAuthentication, isValidUrlUserId, async function (req, res) {
  const userId = req.params.userId
  const userReviews = await Review.findAll({ where: { userId: userId }})
  res.status(200).json({
    reviews: userReviews
  })
})

/*
 * Route to list all of a user's photos.
 */
router.get('/:userId/photos', requireAuthentication, isValidUrlUserId, async function (req, res) {
  const userId = req.params.userId
  const userPhotos = await Photo.findAll({ where: { userId: userId }})
  res.status(200).json({
    photos: userPhotos
  })
})

module.exports = router
