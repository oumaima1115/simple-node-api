//user.controller.js
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
// to generate JWT_SECRET:
// open cmd
// wrote node
// then paste this line of code: require('crypto').randomBytes(64).toString('hex')
const { Types } = require('mongoose');
const RevokedToken = require('../models/RevokedToken');
const { validatePassword, validateEmail } = require('../utils/validateUser');

exports.getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
};

exports.getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  const user = await User.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
  res.json(user);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  await User.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};

exports.signUp = async (req, res) => {
  try {
    const { email, password, name, phone, role, image } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long and contain only letters, numbers, and special characters @$!%*?&" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      image: image || null // Set image to null if not provided
    });
    res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role }, //payload
      JWT_SECRET, //signature
      { algorithm: 'HS256', expiresIn: '24h' }  //optional parameters for the sign function 
    );

    res.json({ message: "Sign in successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// logout
exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (token) {
      // Add the token to the revoked tokens collection
      await RevokedToken.create({
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      });
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};