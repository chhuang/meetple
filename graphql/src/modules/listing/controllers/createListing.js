const format = require("./format");

module.exports = async ({ input, management }) => {
  const { title, description } = input;

  try {
    const entry = await management.createEntry("listing", {
      fields: {
        title: { "en-US": title },
        description: { "en-US": description }
      }
    });

    const publishedEntry = await entry.publish();

    return format(publishedEntry);
  } catch (err) {
    console.error(err);
    return null;
  }
};
