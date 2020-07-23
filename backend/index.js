const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var PORT = process.env.PORT || 8080;

const config = require("./config");
const router = require("./router");

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const appPort = Number(process.env.APP_PORT || config.APP_PORT);

// Setup Public directory
app.use(express.static(path.join(__dirname, "dist")));

// Setup Express middleware
app.use(cors({ origin: config.CORS_ORIGINS }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

if (!isProduction) {
  // Setup logger
  app.use(morgan("dev"));
}

// Init routes
router(app);

// Start the application
app.listen(appPort, (err) => {
  if (err) throw err;

  console.log(`App is running on ${appPort}`);
});
