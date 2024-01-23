const express = require("express");

const contactsControllers = require("../../controllers/contactsControllers");
const { validateContactBody } = require("../../helpers/validateBody");
const schemas = require("../../schemas/contactsSchemas");
const router = express.Router();

router.get("/", contactsControllers.getContacts);

router.get("/:contactId", contactsControllers.getContact);

router.post(
  "/",
  validateContactBody(schemas.addContactSchema),
  contactsControllers.addContact
);

router.delete("/:contactId", contactsControllers.deleteContact);

router.put(
  "/:contactId",
  validateContactBody(schemas.addContactSchema),
  contactsControllers.updateContactById
);

module.exports = router;