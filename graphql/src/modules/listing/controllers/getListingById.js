const format = require("./format");

module.exports = async ({ id, delivery }) => {
  try {
    const entry = await delivery.getEntry(id);

    return format(entry);
  } catch {
    return null;
  }
};
