const jimp = require("jimp");

const resize = async (avatar) => {
  const avat = await jimp.read(avatar);
  await avat.cover(250, 250);
  await avat.writeAsync(avatar);
};

module.exports = resize;
