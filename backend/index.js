const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const goalRoute = require("./src/routes/goalRoutes");
const userRoute = require("./src/routes/userRoute");
const cors = require("cors");

app.use(cors());
const uri = process.env.ATLAS_SECRET;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected successfully");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// for better undrstanding

app.get("/api/test", (req, res) => {
  res.send("Backend is running!");
});

app.post("/api/users", (req, res) => {
  const userData = req.body;
  res.status(201).json({ token: "dummy_token", userData });
});

app.post("/api/users/login", (req, res) => {
  const userData = req.body;
  res.status(200).json({ token: "dummy_token", userData });
});
