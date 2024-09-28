const User = require("../Models/authModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hash_password = await bcrypt.hash(password, 10);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    if (!userCreated) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    res.status(201).json({
      message: "User created successfully",
      user: userCreated,
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, userExists.password);

    if (isMatch) {
      res.status(200).json({
        message: "Login successfully",
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
