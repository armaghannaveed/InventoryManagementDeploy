const mongoose = require('mongoose');
require('dotenv').config();

let mongoConnectLink = process.env.MONGO_URI;

const mongoConnect = (callback) => {
  mongoose.connect(
    mongoConnectLink,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
    .then(() => {
      console.log('Connected to Database');
      callback();
    })
    .catch((error) => console.log(error));
};

module.exports = {
  mongoConnect,
};
