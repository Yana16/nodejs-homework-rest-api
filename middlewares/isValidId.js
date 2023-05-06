const { isValidObjectId } = require("mongoose");
const { ErrorCreator } = require("../utils");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(ErrorCreator(404, `${contactId} is invalid format!`));
  }
};
module.exports = isValidId;
