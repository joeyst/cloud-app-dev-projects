
const business = require('./business.js')
const photo    = require('./photo.js')
const review   = require('./review.js')
const user     = require('./user.js')
const util     = require('./util.js')

module.exports = {
  ...business,
  ...photo,
  ...review,
  ...user,
  ...util
}
