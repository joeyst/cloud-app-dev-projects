const { DataTypes } = require('sequelize')

const sequelize = require('../lib/sequelize')

const { hash } = require('bcrypt')

const User = sequelize.define('user', {
  name: { type: DataTypes.TEXT, allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true }, 
  password: { type: DataTypes.TEXT, set(value) {
    this.setDataValue('password', hash(value))
  },
  admin: { type: DataTypes.BOOLEAN, allowNull: false }
}})

async function isAdmin(req) {
	const user = await User.findOne({ where: { email: req.user.email }})
  return (user.admin == true) // I feel like being explicit with == true here makes it more obvious what it's doing. 
}

exports.User = User
exports.UserClientFields = [
  'name',
  'email',
  'password',
  'admin'
]
exports.isAdmin = isAdmin 