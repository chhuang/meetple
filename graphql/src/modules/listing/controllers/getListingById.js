const format = require("./format");

module.exports = async ({ id, delivery }) => {
  try {
    const entry = await delivery.getEntry(id);
    console.log("entry", entry);
    return format(entry);
  } catch {
    return null;
  }
};
