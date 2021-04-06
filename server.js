var request = require("request"),
  express = require("express"),
  morgan = require("morgan"),
  path = require("path"),
  bodyParser = require("body-parser"),
  async = require("async"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  config = require("./config"),
  helpers = require("./helpers"),
  app = express();

app.use(helpers.rewriteSlash);
app.use(express.static("public"));
if (process.env.SESSION_REDIS) {
  console.log("Using the redis based session manager");
  app.use(session(config.session_redis));
} else {
  console.log("Using local session manager");
  app.use(session(config.session));
}

app.use(bodyParser.json());
app.use(cookieParser("sooper secret"));
app.use(helpers.sessionMiddleware);
app.use(morgan("dev", {}));

var domain = "";
process.argv.forEach(function (val, index, array) {
  var arg = val.split("=");
  if (arg.length > 1) {
    if (arg[0] == "--domain") {
      domain = arg[1];
      console.log("Setting domain to:", domain);
    }
  }
});

/* Mount API endpoints */
require("./api/cart")(app);
require("./api/catalogue")(app);
require("./api/orders")(app);
require("./api/user")(app);
require("./api/news")(app);
require("./api/recommender")(app);

app.use(helpers.errorHandler);

var server = app.listen(process.env.PORT || 8079, function () {
  var port = server.address().port;
  console.log("App now running in %s mode on port %d", app.get("env"), port);
});
