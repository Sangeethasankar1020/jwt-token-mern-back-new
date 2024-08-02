const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            return res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                status: "User created",
            });
        } else {
            return res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Login User
// controllers/userController.js
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('User:', user);
  
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          status: "Login successful",
        });
      } else {
        return res.status(400).json({ error: "Invalid user data" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  

// Get current user
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '20d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
