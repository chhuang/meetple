const convertToMeetpleSchema = require('./convertToMeetpleSchema');
const original = require('./sampleOriginal.json');

describe('Test function: convertToMeetpleSchema', () => {
  test('Sample data', () => {
    const result = convertToMeetpleSchema(original);
    expect(result).toMatchSnapshot();
  });
});
