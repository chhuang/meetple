module.exports = {
  Query: {
    listing: () => {
      return {
        id: "id",
        name: "name",
        description: "description"
      };
    }
  },

  Mutation: {
    createListing: async (
      obj,
      { input: { name, description } },
      { api: { contentful } }
    ) => {
      const entry = await contentful.management.createEntry("listing", {
        fields: {
          name: { "en-US": name },
          description: { "en-US": description }
        }
      });

      const publishedEntry = await entry.publish();

      return {
        id: publishedEntry.sys.id,
        name: publishedEntry.fields.name["en-US"],
        description: publishedEntry.fields.description["en-US"],
        meta: {
          createdAt: publishedEntry.sys.createdAt,
          updatedAt: publishedEntry.sys.updatedAt
        }
      };
    }
  }
};
