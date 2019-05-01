const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 5000;
// DB Config
const db = require("./config/keys").mongoURI;
const routerApi = require("./api/router");
const path = require("path");
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

app.use("/api", routerApi);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(db)
  .then(() => console.log("MONGODB CONNECTED"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
