const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/users");
const { HttpError } = require("../../helpers");
const { resize } = require("../../middlewares");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    await resize(tempUpload);
    const { _id } = req.user;
    const filename = `${_id}_${originalname}`;

    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    const user = await User.findByIdAndUpdate(_id, { avatarURL });
    if (!user) {
      throw HttpError(404, "Not found");
    }

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
