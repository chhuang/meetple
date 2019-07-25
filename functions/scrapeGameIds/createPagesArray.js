module.exports = args => {
  args = args || {};

  const { from = 1, to = 1 } = args;

  let fromNumber = parseInt(from) || 1;
  let toNumber = parseInt(to) || 1;
  toNumber = Math.max(fromNumber, toNumber);

  return Array(toNumber - fromNumber + 1)
    .fill()
    .map((element, index) => index + fromNumber);
};
