module.exports = maxPage =>
  Array(parseInt(maxPage) || 1)
    .fill()
    .map((element, index) => index + 1);
