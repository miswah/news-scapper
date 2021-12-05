const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const news = mongoose.model("news", newsSchema);
module.exports = news;
