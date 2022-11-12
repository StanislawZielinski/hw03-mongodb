const UserSchema = require('../services/schemas/userSchema')

const listUser = async () => {
  return UserSchema.find()
}

const getUserById = (id) => {
  return UserSchema.findOne({ _id: id })
}

const addUser = (body) => {
  return UserSchema.create(body)
}

const updateUser = (id, body) => {
  return UserSchema.findByIdAndUpdate({ _id: id }, body, { new: true })
}

const removeUser = (id) => {
  return UserSchema.findByIdAndRemove({ _id: id })
}

const updateStatusUser = (id, body) => {
  return UserSchema.findByIdAndUpdate({ _id: id }, body, { new: true })
}

module.exports = {
    listUser,
    getUserById,
    addUser,
    updateUser,
    removeUser,
    updateStatusUser
}