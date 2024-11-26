const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users.js");
require("dotenv").config(); // Import dotenv to use .env variables

const app = express();
app.use(cors());
app.use(express.json());

// Use the MONGO_URI from the .env file
const mongoURI = process.env.MONGO_URI;
console.log("Mongo URI:", process.env.MONGO_URI);
mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Failed to connect to MongoDB Atlas:", err));

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateuser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
    }
  )
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/createuser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
