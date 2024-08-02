const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const goalRoute = require("./src/routes/goalRoutes");
const userRoute=require("./src/routes/userRoute")

const uri = process.env.ATLAS_SECRET;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connected successfully");
});

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/api/goals", goalRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
    res.send('hello');
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
