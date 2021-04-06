const endpoints = require("../endpoints"),
  helpers = require("../../helpers");

module.exports = function (app) {
  app.get("/news", function (req, res, next) {
    helpers.simpleHttpRequest(endpoints.newsUrl, res, next);
  });

  module.exports = app;
};
