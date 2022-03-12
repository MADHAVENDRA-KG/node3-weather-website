const request = require("request");
const weatherupdate = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=548bcde125b2d8b06a276ab08048e375&query=" +
    address;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.error) {
      callback("Something error occure", undefined);
    } else {
      callback(
        undefined,
        "The current temperature is" +
          response.body.current.temperature +
          "And it fells like" +
          response.body.current.feelslike
      );
    }
  });
};
module.exports = weatherupdate;
