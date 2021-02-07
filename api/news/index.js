(function () {
  "use strict";

  var express = require("express"),
    request = require("request"),
    endpoints = require("../endpoints"),
    helpers = require("../../helpers"),
    app = express();

  app.get("/news", function (req, res, next) {
    helpers.simpleHttpRequest(endpoints.newsUrl, res, next);
  });

  module.exports = app;
})();
