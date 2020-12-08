module.exports.getDate = function () {
  const today = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }

  const date = today.toLocaleDateString("en-us", options);
  return date;
};

module.exports.getDay = function () {
  const today = new Date();
  const options = {
    weekday: 'long'
  }

  const date = today.toLocaleDateString("en-us", options);
  return date;
};
