const Contact = require("../services/schemas/contactSchema");

const listContacts = async (id) => {
  return Contact.find({ owner: id });
};

const getLimitedContactsWithFavorite = async (
  userId,
  limit,
  startIndex,
  favorite
) => {
  return Contact.find({ favorite: favorite, owner: userId })
    .limit(limit)
    .skip(startIndex);
};

const getLimitedContacts = async (userId, limit, startIndex) => {
  return Contact.find({ owner: userId }).limit(limit).skip(startIndex);
};

const getFavoriteContacts = async (favorite) => {
  return Contact.find({ favorite: favorite });
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = async (userId, body) => {
  return await Contact.create({ ...body, owner: userId });
};

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const removeContact = (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
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
