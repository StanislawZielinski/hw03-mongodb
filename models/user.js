const UserSchema = require("../services/schemas/userSchema");

const getUserByEmail = (email) => {
  return UserSchema.findOne({ email: email });
};

const getUserById = (id) => {
  return UserSchema.findOne({ _id: id });
};

const loginUser = (id, token) => {
  return UserSchema.findByIdAndUpdate(
    { _id: id },
    { token: token },
    { new: true }
  );
};

const logoutUser = (id) => {
  return UserSchema.findByIdAndUpdate(
    { _id: id },
    { token: null },
    { new: true }
  );
};
const updateAvatar = (id, avatar) => {
  return UserSchema.findByIdAndUpdate(
    { _id: id },
    { avatarURL: avatar },
    { new: true }
  );
};

module.exports = {
  getUserByEmail,
  getUserById,
  loginUser,
  logoutUser,
  updateAvatar,
};
