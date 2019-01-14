const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const passport = require("passport");

//Load users and ideas routes
const users = require("./routes/api/users");
const ideas = require("./routes/api/ideas");

const app = express();

//connect to database
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// parse application/x-www-form-urlencoded and  parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/ideas", ideas);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
