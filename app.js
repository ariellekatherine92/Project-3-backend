// Imports
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
//const PORT = process.env.PORT || 8000;

app.set("port", process.env.PORT || 9000);


// API
const users = require("./api/users");
const favorites = require("./api/favorites");

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initialize Passport and use config file
app.use(passport.initialize());
require("./config/passport")(passport);

// Home route
app.get("/", (req, res) => {
  res.send("Ooompa Loompa")
});

// Routes
app.use("/api/users", users);
app.use("/api/favorites", favorites);

app.get("/*", (req, res) => {
  res.status(404).json({ message: "Data not found" });
});


app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
  console.log(`http://localhost:${app.get("port")}`)
});
// app.listen(PORT, () => {
//   console.log(`Server is listening 🎧 on port: ${PORT}`);
// });
//let server = app.listen(app.get("port"));

