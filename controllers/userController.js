const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// OPTIONAL: Token blacklist (send to auth.js)
let tokenBlacklist = [];

const getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

const getUser = (req, res) => {
  const id = req.params.id;
  User.getById(id, (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  });
};

const createUser = (req, res) => {
  const { fullname, email, password, role, whatsapp, Phone, photo, github, expertise, CV } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  User.create({ fullname, email, password: hashed, role, whatsapp, Phone, photo, github, expertise, CV }, (err, id) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: 'User created', id });
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const { fullname, email, password, role } = req.body;
  const hashed = password ? bcrypt.hashSync(password, 10) : undefined;
  User.update(id, { fullname, email, password: hashed, role }, (err, affectedRows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!affectedRows) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated' });
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  User.delete(id, (err, affectedRows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!affectedRows) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  });
};

// Login
const login = (req, res) => {
  const { email, password } = req.body;
  User.getByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, fullname: user.fullname, email: user.email, role: user.role } });
  });
};

// ======================
// ✅ LOGOUT 
// ======================
const logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token missing" });
  }

  // Save token in blacklist
  tokenBlacklist.push(token);

  res.json({ message: "Logout successful" });
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser, login, logout , tokenBlacklist };
