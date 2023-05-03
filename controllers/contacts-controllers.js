const ErrorCreator = require("../utils/ErrorCreator");
const ctrlWrapper = require("../utils/ctrlWrapper");
const { Contact } = require("../models/contacts");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  // console.log(favorite)
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  // const filteredContacts =
  // 	req.query.favorite === undefined
  // 		? result
  // 		: await result.filter((contact) => {
  // 				return contact.favorite === req.query.favorite
  // 		  })
  res.json(result);
};
const contactsListFavourite = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    favourite: true,
  }).populate("owner", "name email");
  res.json(result);
};
const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};
const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return ErrorCreator(404);
  }
  res.json(contact);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    return ErrorCreator(404);
  }
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updatedContact) {
    return ErrorCreator(404);
  }
  res.json(updatedContact);
};
const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    return ErrorCreator(404);
  }
  res.status(201).json(updatedContact);
};
module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  contactsListFavourite: ctrlWrapper(contactsListFavourite),
};
