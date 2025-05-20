const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const indexRoute = require("./routes");
const viewRoute = require("./routes/views.route");
const exHbs = require("express-handlebars");

const cookieParser = require("cookie-parser");
const errorHandlerMiddleware = require("./middlewares/errors/error-handler.middleware");
const requestLogger = require("./middlewares/loggers/request.logger");
const requestErrorLogger = require("./middlewares/loggers/request-error.logger");

const PORT = config.get("port") || 3030;

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });


// console.log(process.env.NODE_ENV);
// console.log(process.env.secret_token);
// console.log(config.get("secret_token"));

// logger.log("info", "oddiy log");
// logger.error("error log");
// logger.debug("debug log");
// logger.warn("warn log");
// logger.info("info log");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger)
app.use(requestErrorLogger)

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("views"));


app.use("/", viewRoute);
app.use("/api", indexRoute);



app.use(errorHandlerMiddleware); // error handler eng oxiri yozilishi kerak


async function start() {
  try {
    const uri = config.get("dbUri");
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`);
    });
  } catch (error) {
    console.log(`error: `, error.message);
  }
}
start();
