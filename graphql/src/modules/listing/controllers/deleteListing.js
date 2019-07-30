module.exports = async ({ id, management }) => {
  try {
    const entry = await management.getEntry(id);

    const unpublishedEntry = await entry.unpublish();

    await unpublishedEntry.delete();

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
