const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const hello = (req, res) => {
  return res.json({ user: ["user1", "user2", "user3"] });
};


const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exsistUSer = await User.findOne({ email: email });

    if (exsistUSer) {
      return res.status(400).json({
        error: "user already exists",
        exsistUSer
      });
    } else {
      const hash_password = await bcrypt.hash(password, 10);
      const newUser = User({
        username: name,
        email: email,
        password: hash_password,
      });

      await newUser.save();
      return res.status(200).json({ message: "success full" });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "an error occured",error });
  }
};


// Login endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "user has no account" });
    }

    const validPassword = await bcrypt.compare(password, user.password)
    

    if (!validPassword) {
        res.status(400).json({ error: "password is incorrect" });
      console.log(validPassword);
    } else {
      
      const token = jwt.sign({userID : user.id}, process.env.JWT_KEY, {expiresIn: '2d'})
      
      return res.status(200).json({ message: "success full",token });

    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hello,
  register,
  login,
};
