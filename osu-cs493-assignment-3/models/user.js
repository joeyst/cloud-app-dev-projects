const { DataTypes } = require('sequelize')

const sequelize = require('../lib/sequelize')

const { hashSync } = require('bcrypt')

const User = sequelize.define('user', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true }, 
  password: { type: DataTypes.STRING, set(value) {
    this.setDataValue('password', hashSync(value, 10)) 
  }},
  admin: { type: DataTypes.BOOLEAN, defaultValue: false }
})

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Table deleted and recreated successfully.');
//   })
//   .catch((error) => {
//     console.error('Error deleting and recreating table:', error);
//   });

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