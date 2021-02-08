(function () {
  "use strict";

  var express = require("express"),
    request = require("request"),
    endpoints = require("../endpoints"),
    helpers = require("../../helpers"),
    app = express();

  app.get("/recommender", function (req, res, next) {
    helpers.simpleHttpRequest(endpoints.recommenderUrl, res, next);
  });

  module.exports = app;
})();
