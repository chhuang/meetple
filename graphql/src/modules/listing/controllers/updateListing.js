const format = require("./format");

module.exports = async ({ id, input, management }) => {
  const { title, description } = input;

  try {
    const entry = await management.getEntry(id);

    if (title) {
      entry.fields.title["en-US"] = title;
    }

    if (description) {
      entry.fields.description["en-US"] = description;
    }

    const updatedEntry = await entry.update();

    return format(updatedEntry);
  } catch (err) {
    console.error(err);
    return null;
  }
};
