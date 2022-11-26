const UserSchema = require("../services/schemas/userSchema");

const getUserByEmail = (email, verified) => {
  return UserSchema.findOne({ email: email, verify: verified });
};

const getUserById = (id) => {
  return UserSchema.findOne({ _id: id });
};

const getUserByverificationToken = (verificationToken) => {
  return UserSchema.findOne({ verificationToken: verificationToken });
};

const loginUser = (id, token) => {
  return UserSchema.findByIdAndUpdate(
    { _id: id },
    { token: token },
    { new: true }
  );
};

const verifyUser = (id) => {
  return UserSchema.findByIdAndUpdate(
    { _id: id },
    { verify: true, verificationToken: null }
    // { new: true }
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
const setNewVerificationToken = (id, verificationToken) => {
  return UserSchema.findByIdAndUpdate(
    { _id: id },
    { verificationToken: verificationToken }
  );
};

module.exports = {
  getUserByEmail,
  getUserById,
  loginUser,
  logoutUser,
  updateAvatar,
  getUserByverificationToken,
  verifyUser,
  setNewVerificationToken,
};
