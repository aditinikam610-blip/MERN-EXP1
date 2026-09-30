const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

const SALT_ROUNDS = 10;

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password required'
      });
    }

    // Check whether user already exists
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = new User({
      name,
      email,
      passwordHash,
      role
    });

    // Save user in MongoDB
    await user.save();

    res.status(201).json({
      message: 'User registered'
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);

    if (!ok) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const jwt = require('jsonwebtoken');

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router;