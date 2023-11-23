const mongoose = require("mongoose");
require("dotenv").config();
var url = process.env.DB_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
});
