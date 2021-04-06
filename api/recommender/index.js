const endpoints = require("../endpoints"),
  helpers = require("../../helpers");

module.exports = function (app) {
  app.get("/recommender", function (req, res, next) {
    helpers.simpleHttpRequest(endpoints.recommenderUrl, res, next);
  });
};
