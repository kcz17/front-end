const request = require("request"),
  endpoints = require("../endpoints"),
  helpers = require("../../helpers");

module.exports = function (app) {
  app.get("/catalogue/images*", function (req, res, next) {
    var url = endpoints.catalogueUrl + req.url.toString();
    request
      .get(url)
      .on("error", function (e) {
        next(e);
      })
      .pipe(res);
  });

  app.get("/catalogue*", function (req, res, next) {
    helpers.simpleHttpRequest(
      endpoints.catalogueUrl + req.url.toString(),
      res,
      next
    );
  });

  app.get("/tags", function (req, res, next) {
    helpers.simpleHttpRequest(endpoints.tagsUrl, res, next);
  });
};
