const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "-createdAt -updateAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");

  res.json(result);
};

module.exports = getAll;
