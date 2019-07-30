const controllers = require("./controllers");

module.exports = {
  Query: {
    listing: async (
      obj,
      { id },
      {
        api: {
          contentful: { delivery }
        }
      }
    ) => {
      return await controllers.getListingById({ id, delivery });
    }
  },

  Mutation: {
    createListing: async (
      obj,
      { input },
      {
        api: {
          contentful: { management }
        }
      }
    ) => {
      return await controllers.createListing({ input, management });
    },

    updateListing: async (
      obj,
      { id, input },
      {
        api: {
          contentful: { management }
        }
      }
    ) => {
      return await controllers.updateListing({ id, input, management });
    },

    deleteListing: async (
      obj,
      { id },
      {
        api: {
          contentful: { management }
        }
      }
    ) => {
      return await controllers.deleteListing({ id, management });
    }
  }
};
