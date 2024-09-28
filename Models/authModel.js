const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  phone: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SELECT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw error;
  }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
