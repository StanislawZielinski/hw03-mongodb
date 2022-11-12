const UserSchema = require('../services/schemas/userSchema')

// const listUser = async () => {
//   return UserSchema.find()
// }

const getUserByEmail = (email) => {
  return UserSchema.findOne({ email: email })
}

const getUserById = (id) => {
  return UserSchema.findOne({ _id: id })
}

// const addUser = (body) => {
//   return UserSchema.create(body)
// }

const loginUser = (id, token) => {
  return UserSchema.findByIdAndUpdate({ _id: id},{token:token}, { new: true })
}

const logoutUser = (id) => {
  return UserSchema.findByIdAndUpdate({ _id: id},{token:null}, { new: true })
}
// const removeUser = (id) => {
//   return UserSchema.findByIdAndRemove({ _id: id })
// }

// const updateStatusUser = (id, body) => {
//   return UserSchema.findByIdAndUpdate({ _id: id }, body, { new: true })
// }

module.exports = {
    // listUser,
    getUserByEmail,
    getUserById,
    loginUser,
    logoutUser,
    // addUser,
    // updateUser,
    // removeUser,
    // updateStatusUser
}