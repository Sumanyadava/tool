const express = require("express")
const dotenv = require('dotenv')
const conntectDB = require('./config/db.js')
const router = require('./router/router.js');
const bcrypt = require('bcrypt');
const User = require('./models/user.models.js')


dotenv.config()

const app = express()
app.use(express.json());
conntectDB()

const PORT= process.env.PORT || 4000;


app.use('/', router);

//api register

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
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
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: '1h',
    // });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});



app.listen(PORT , () => console.log(`server is running at ${PORT}`))