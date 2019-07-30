const get = require("lodash/get");

module.exports = entry => ({
  id: get(entry, "sys.id"),
  title: get(entry, "fields.title.en-US") || get(entry, "fields.title"),
  description:
    get(entry, "fields.description.en-US") || get(entry, "fields.description"),
  meta: {
    createdAt: get(entry, "sys.createdAt"),
    updatedAt: get(entry, "sys.updatedAt")
  }
});
