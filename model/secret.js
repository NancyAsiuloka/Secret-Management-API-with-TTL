const mongoose = require("mongoose");


// Define the Secret schema
const secretSchema = new mongoose.Schema({
  key: {
     type: String,
      required: true,
       unique: true
    },
  value: {
     type: String,
      required: true
    },
  expirationTime: {
     type: Date,
      required: true
    },
});

// Create the Secret model
const Secret = mongoose.model("Secret", secretSchema);
module.exports = Secret;
