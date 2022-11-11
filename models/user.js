const User = require('../services/schemas/userSchema')

const listUser = async () => {
  return User.find()
}

const getUserById = (id) => {
  return User.findOne({ _id: id })
}

const addUser = (body) => {
  return User.create(body)
}

const updateUser = (id, body) => {
  return User.findByIdAndUpdate({ _id: id }, body, { new: true })
}

const removeUser = (id) => {
  return User.findByIdAndRemove({ _id: id })
}

const updateStatusUser = (id, body) => {
  return User.findByIdAndUpdate({ _id: id }, body, { new: true })
}

module.exports = {
    listUser,
    getUserById,
    addUser,
    updateUser,
    removeUser,
    updateStatusUser
}