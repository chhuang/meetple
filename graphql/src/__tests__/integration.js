require("dotenv").config();
const {
  MONGO_URI,
  CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT_ID
} = process.env;

const { createTestClient } = require("apollo-server-testing");
const { gql } = require("apollo-server");
const connectMongoDB = require("../databases/MongoDB");
const createContentfulDeliveryClient = require("../api/Contentful/Delivery");
const createContentfulManagementEnvironment = require("../api/Contentful/Management");
const createServer = require("../createServer");

let query, mutate;

beforeAll(async () => {
  try {
    const mongoDb = await connectMongoDB(MONGO_URI);

    const contentfulDeliveryClient = createContentfulDeliveryClient({
      accessToken: CONTENTFUL_DELIVERY_ACCESS_TOKEN,
      spaceId: CONTENTFUL_SPACE_ID,
      environmentId: CONTENTFUL_ENVIRONMENT_ID
    });

    const contentfulManagementEnvironment = await createContentfulManagementEnvironment(
      {
        accessToken: CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
        spaceId: CONTENTFUL_SPACE_ID,
        environmentId: CONTENTFUL_ENVIRONMENT_ID
      }
    );

    const apolloServer = createServer({
      mongoDb,
      contentfulDeliveryClient,
      contentfulManagementEnvironment
    });

    const testClient = await createTestClient(apolloServer);

    query = testClient.query;
    mutate = testClient.mutate;
  } catch (err) {
    console.error(err);
  }
}, 10000); // 10 seconds timeout limit

test("Game queries", async () => {
  const GET_GAMES = gql`
    query {
      game(id: "220308") {
        name
      }
      topGames(category: boardgame) {
        name
      }
      searchGames(name: "a") {
        name
      }
    }
  `;

  const res = await query({ query: GET_GAMES });

  expect(typeof res.data.game).toStrictEqual("object");
  expect(typeof res.data.topGames).toStrictEqual("object");
  expect(typeof res.data.searchGames).toStrictEqual("object");

  expect(res.data.game).not.toBeNull();
  expect(res.data.topGames).not.toBeNull();
  expect(res.data.searchGames).not.toBeNull();
}, 10000);

test("Listing queries and mutations", async () => {
  const TITLE = "TITLE";
  const DESCRIPTION = "DESCRIPTION";
  const NEW_TITLE = "NEW_TITLE";
  const NEW_DESCRIPTION = "NEW_DESCRIPTION";

  let ENTRY_ID;

  /**
   * CREATE NEW LISTING
   */
  const CREATE_LISTING = gql`
    mutation($title: String!, $description: String!) {
      createListing(input: { title: $title, description: $description }) {
        id
        title
        description
        meta {
          createdAt
          updatedAt
        }
      }
    }
  `;

  const newListing = await mutate({
    mutation: CREATE_LISTING,
    variables: { title: TITLE, description: DESCRIPTION }
  });

  ENTRY_ID = newListing.data.createListing.id;

  expect(newListing.data.createListing.title).toStrictEqual(TITLE);
  expect(newListing.data.createListing.description).toStrictEqual(DESCRIPTION);

  /**
   * GET LISTING BY ID
   */
  const GET_LISTING = gql`
    query($id: ID!) {
      listing(id: $id) {
        id
        title
        description
        meta {
          createdAt
          updatedAt
        }
      }
    }
  `;

  const foundListing = await query({
    query: GET_LISTING,
    variables: { id: ENTRY_ID }
  });

  expect(foundListing.data.listing.id).toStrictEqual(ENTRY_ID);
  expect(foundListing.data.listing.title).toStrictEqual(TITLE);
  expect(foundListing.data.listing.description).toStrictEqual(DESCRIPTION);

  /**
   * UPDATE LISTING
   */
  const UPDATE_LISTING = gql`
    mutation($id: ID!, $title: String!, $description: String!) {
      updateListing(
        id: $id
        input: { title: $title, description: $description }
      ) {
        id
        title
        description
        meta {
          createdAt
          updatedAt
        }
      }
    }
  `;

  const updatedListing = await mutate({
    mutation: UPDATE_LISTING,
    variables: { id: ENTRY_ID, title: NEW_TITLE, description: NEW_DESCRIPTION }
  });

  expect(updatedListing.data.updateListing.id).toStrictEqual(ENTRY_ID);
  expect(updatedListing.data.updateListing.title).toStrictEqual(NEW_TITLE);
  expect(updatedListing.data.updateListing.description).toStrictEqual(
    NEW_DESCRIPTION
  );

  /**
   * DELETE LISTING
   */
  const DELETE_LISTING = gql`
    mutation($id: ID!) {
      deleteListing(id: $id)
    }
  `;

  const deleteResponse = await mutate({
    mutation: DELETE_LISTING,
    variables: { id: ENTRY_ID }
  });

  expect(deleteResponse.data.deleteListing).toStrictEqual(true);
}, 20000);
