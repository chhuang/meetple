const get = require("lodash/get");

module.exports = original => {
  const primaryName = original.name.find(
    name => get(name, "$.type") === "primary"
  );

  const name = get(primaryName, "$.value");

  const description = get(original, "description[0]");

  const assets = {
    thumbnail: get(original, "thumbnail[0]"),
    image: get(original, "image[0]")
  };

  const info = {
    yearPublished: get(original, "yearpublished[0].$.value"),
    minPlayers: get(original, "minplayers[0].$.value"),
    maxPlayers: get(original, "maxplayers[0].$.value"),
    playingTime: get(original, "playingtime[0].$.value"),
    minPlayTime: get(original, "minplaytime[0].$.value"),
    maxPlayTime: get(original, "maxplaytime[0].$.value"),
    minAge: get(original, "minage[0].$.value")
  };

  const categories = [];
  const mechanics = [];
  const families = [];
  const implementations = [];
  const designers = [];
  const artists = [];
  const publishers = [];

  original.link.forEach(link => {
    switch (get(link, "$.type")) {
      case "boardgamecategory":
        categories.push(get(link, "$.value"));
        break;

      case "boardgamemechanic":
        mechanics.push(get(link, "$.value"));
        break;

      case "boardgamefamily":
        families.push(get(link, "$.value"));
        break;

      case "boardgameimplementation":
        implementations.push(get(link, "$.value"));
        break;

      case "boardgamedesigner":
        designers.push(get(link, "$.value"));
        break;

      case "boardgameartist":
        artists.push(get(link, "$.value"));
        break;

      case "boardgamepublisher":
        publishers.push(get(link, "$.value"));
        break;

      default:
        break;
    }
  });

  const originalRanks =
    get(original, "statistics[0].ratings[0].ranks[0].rank") || [];

  const ranks = originalRanks.map(rank => ({
    name: get(rank, "$.name"),
    friendlyName: get(rank, "$.friendlyname"),
    value: get(rank, "$.value"),
    averageRating: get(rank, "$.bayesaverage")
  }));

  const weight = {
    average: get(original, "statistics[0].ratings[0].averageweight[0].$.value"),
    count: get(original, "statistics[0].ratings[0].numweights[0].$.value")
  };

  return {
    name,
    description,
    assets,
    info,
    categories,
    mechanics,
    families,
    implementations,
    designers,
    artists,
    publishers,
    ranks,
    weight
  };
};
