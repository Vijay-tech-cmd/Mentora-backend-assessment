const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    // Basic validation
    if (!email || !password || !role || !name) {
      return res.status(400).json({ error: 'Email, password, role, and name are required.' });
    }

    if (!['parent', 'mentor'].includes(role)) {
      return res.status(400).json({ error: 'Role must be "parent" or "mentor".' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const user = new User({ email, password, role, name });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during signup.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login.' });
  }
};

const getMe = async (req, res) => {
  res.json({
    id: req.user._id,
    email: req.user.email,
    role: req.user.role,
    name: req.user.name
  });
};

module.exports = { signup, login, getMe };
