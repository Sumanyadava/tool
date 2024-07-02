const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const hello = (req, res) => {
  return res.send("hello world");
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({message:"User registered successfully", data:newUser});
    console.log(newUser);
  } catch (error) {
    console.error("Error handling register request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Email not found");
    }

    // Compare the password
    // const isMatch = await bcrypt.compare(password, user.password);
    if (password != user.password) {
      return res.status(400).json({message:"Invalid email or password"});
    } 

    // Optionally create a JWT token
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error handling login request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  hello,
  register,
  login,
};
