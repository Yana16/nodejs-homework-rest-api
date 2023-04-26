const contacts = require("../models/contact");

const { HttpError } = require("../helpers");

const { crtlWrapper } = require("../utils");

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }

  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.add(req.body);
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json({
    message: "Deleted succesfully",
  });
};

module.exports = {
  getAllContacts: crtlWrapper(getAllContacts),
  getContactById: crtlWrapper(getContactById),
  addContact: crtlWrapper(addContact),
  updateContactById: crtlWrapper(updateContactById),
  deleteContactById: crtlWrapper(deleteContactById),
};
