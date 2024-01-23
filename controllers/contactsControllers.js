const { contactsService } = require('../services/contactsService');

// GET /api/contacts
const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// GET /api/contacts/:id
const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactsService.getContactById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contacts/:id
const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedContact = await contactsService.removeContact(id);
    if (deletedContact) {
      res.status(200).json(deletedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

// POST /api/contacts
const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await contactsService.addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

// PUT /api/contacts/:id
const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedContact = await contactsService.updateContact(id, { name, email, phone });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact };
