const { DataTypes } = require('sequelize')

const sequelize = require('../lib/sequelize')

const User = sequelize.define('user', {
  name: { type: DataTypes.TEXT, allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true }, 
  password: { type: DataTypes.TEXT, set(value) {
    this.setDataValue('password', hash(value))
  },
  admin: { type: DataTypes.BOOLEAN, allowNull: false }
}})

exports.User = User
exports.UserClientFields = [
  'name',
  'email',
  'password',
  'admin'
]
