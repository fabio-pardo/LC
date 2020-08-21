var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("hbs");
const passport = require("passport");

var questionsRouter = require("./routes/questions");
var usersRouter = require("./routes/users");

const mongoose = require("mongoose");
var app = express();

////running the questionBank filler script
//var questionBank = require("./scripts/questionBank");
//questionBank.questionBank("./scripts/");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const db = require("./config/secrets").mongodb;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use("/", express.static(path.join(__dirname, "/client/build")));
app.use("/users", usersRouter);
app.use("/questions", questionsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

hbs.registerHelper("json", function (context) {
  return JSON.stringify(context);
});

//if (process.env.NODE_ENV === "production") {
//app.use(express.static("client/build"));
//}

module.exports = app;
