const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://antony_DB:antony_PassDB@clustertest.ourtrww.mongodb.net/";

mongoose.connect(mongoUrl);

module.exports = mongoose;
