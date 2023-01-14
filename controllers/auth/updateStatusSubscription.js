const { User } = require("../../models/users");

const { HttpError } = require("../../helpers");

const updateStatusSubscription = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(400, "missing field subscription");
  }
  res.json(result);
};

module.exports = updateStatusSubscription;
