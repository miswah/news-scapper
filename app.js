const PORT = 3000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

//import functions
const NDTV = require("./src/NDTV");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "nikhil",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const app = express();

NDTV.scrappNDTV();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
