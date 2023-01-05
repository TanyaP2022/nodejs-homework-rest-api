const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(400, "missing field favorite");
  }
  res.json(result);
};

module.exports = updateStatusContact;
