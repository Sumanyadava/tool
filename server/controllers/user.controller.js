
const bcrypt = require('bcrypt');
const User = require('../models/user.models')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()


const hello = (req,res) => {
  return res.send("hello world")
}



const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).send('User registered successfully',newUser);
    console.log(newUser)
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
}




// Login endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Email not found');
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    // Optionally create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful',token });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

module.exports = {
  hello,
  register,
  login
};