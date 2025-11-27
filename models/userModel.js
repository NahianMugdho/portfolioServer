const db = require('../config/db');

const User = {
  // সব ইউজার পাওয়া
  getAll: (cb) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
      if (err) return cb(err);
      cb(null, results);
    });
  },

  // আইডি দিয়ে এক ইউজার পাওয়া
  getById: (id, cb) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return cb(err);
      cb(null, results[0]);
    });
  },

  // নতুন ইউজার তৈরি
  create: ({ fullname, email, password, role }, cb) => {
    const sql = 'INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [fullname, email, password, role], (err, result) => {
      if (err) return cb(err);
      cb(null, result.insertId);
    });
  },

  // ইউজার আপডেট
  update: (id, { fullname, email, password, role }, cb) => {
    const sql = 'UPDATE users SET fullname=?, email=?, password=?, role=? WHERE id=?';
    db.query(sql, [fullname, email, password, role, id], (err, result) => {
      if (err) return cb(err);
      cb(null, result.affectedRows);
    });
  },

  // ইউজার ডিলিট
  delete: (id, cb) => {
    const sql = 'DELETE FROM users WHERE id=?';
    db.query(sql, [id], (err, result) => {
      if (err) return cb(err);
      cb(null, result.affectedRows);
    });
  }
};

module.exports = User;
