const { listContacts } = require("../services/contactsServices");
const { getContactById } = require("../services/contactsServices");
const { HttpError } = require("../helpers/HttpError");
const { removeContact } = require("../services/contactsServices");
const { addContact } = require("../services/contactsServices");
const { validateContactSchema } = require("../schemas/contactsSchemas");
const { updateContact } = require("../services/contactsServices");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);

    if (contact) {
      res.status(200).json(contact);
    } else {
      throw new HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.id);

    if (contact) {
      res.status(200).json(contact);
    } else {
      throw new HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};
const createContact = async (req, res, next) => {
  try {
    const { error } = validateContactSchema(req.body);

    if (error) {
      throw new HttpError(400, error.message);
    }

    const newContact = await addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
const updateContactById = async (req, res, next) => {
  try {
    const contactId = req.params.id;

    const existingContact = await getContactById(contactId);
    if (!existingContact) {
      throw new HttpError(404, "Not found");
    }

    const { error } = validateContactUpdateSchema(req.body);

    if (error) {
      throw new HttpError(400, error.message);
    }

    if (Object.keys(req.body).length === 0) {
      throw new HttpError(400, "Body must have at least one field");
    }

    const updatedContact = await updateContact(contactId, req.body);

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  updateContactById,
};
