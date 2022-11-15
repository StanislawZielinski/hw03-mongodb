const Contact = require("../services/schemas/contactSchema");

const listContacts = async () => {
  return Contact.find();
};

const getLimitedContactsWithFavorite = async (limit, startIndex, favorite) => {
  return Contact.find({ favorite: favorite }).limit(limit).skip(startIndex);
};

const getLimitedContacts = async (limit, startIndex) => {
  return Contact.find().limit(limit).skip(startIndex);
};

const getFavoriteContacts = async (favorite) => {
  return Contact.find({ favorite: favorite });
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = (body) => {
  return Contact.create(body);
};

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
  getLimitedContacts,
  getFavoriteContacts,
  getLimitedContactsWithFavorite,
};
