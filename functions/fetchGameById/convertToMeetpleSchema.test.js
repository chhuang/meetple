const convertToMeetpleSchema = require('./convertToMeetpleSchema');
const original = require('./sampleOriginal.json');

describe('Test function: convertToMeetpleSchema', () => {
  test('Sample data', () => {
    const result = convertToMeetpleSchema(original);

    expect(result.name).toStrictEqual('Gaia Project');
    expect(result.description.includes('Gaia Project')).toBe(true);

    expect(typeof result.assets).toStrictEqual('object');
    expect(result.assets.thumbnail).not.toBeNull();
    expect(result.assets.image).not.toBeNull();

    expect(typeof result.info).toStrictEqual('object');
    expect(result.info.yearPublished).toStrictEqual('2017');
    expect(result.info.minPlayers).toStrictEqual('1');
    expect(result.info.maxPlayers).toStrictEqual('4');
    expect(result.info.playingTime).toStrictEqual('150');
    expect(result.info.minPlayTime).toStrictEqual('60');
    expect(result.info.maxPlayTime).toStrictEqual('150');
    expect(result.info.minAge).toStrictEqual('12');
  });
});
