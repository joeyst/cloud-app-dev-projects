
const business = require('./business.js')
const photo    = require('./photo.js')
const review   = require('./review.js')
const user     = require('./user.js')

module.exports = {
  ...business,
  ...photo,
  ...review,
  ...user
}
