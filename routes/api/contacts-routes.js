const express = require("express");
const { schemas } = require("../../models/contacts");
const { validateBody } = require("../../utils");
const { isValidId, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/contacts-controllers");
const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrl.listContacts);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

contactsRouter.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

contactsRouter.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrl.removeContact
);

contactsRouter.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = contactsRouter;
