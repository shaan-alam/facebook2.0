const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  imageUrl: {
    type: String,
    default: "",
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
