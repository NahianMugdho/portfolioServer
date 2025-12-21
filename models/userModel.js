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
  create: ({ fullname, email, password, role ,whatsapp,Phone,photo,github,expertise,CV }, cb) => {
    const sql = 'INSERT INTO users (fullname, email, password, role,whatsapp,Phone,photo,github,expertise,CV ) VALUES (?, ?, ?, ?,?,?,?,?,?,?)';
    db.query(sql, [fullname, email, password, role,whatsapp,Phone,photo,github,expertise,CV], (err, result) => {
      if (err) return cb(err);
      cb(null, result.insertId);
    });
  },

  // ইউজার আপডেট
  // update: (id, { fullname, email, password, role ,whatsapp,Phone,photo,github,expertise,CV}, cb) => {
  //   const sql = 'UPDATE users SET fullname=?, email=?, password=?, role=?, whatsapp=?, Phone=?, photo=?, github=?, expertise=?, CV=? WHERE id=?';
  //   db.query(sql, [fullname, email, password, role, id,whatsapp,Phone,photo,github,expertise,CV], (err, result) => {
  //     if (err) return cb(err);
  //     cb(null, result.affectedRows);
  //   });
  // },
  update: (id, data, cb) => {
  const fields = [];
  const values = [];

  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  });

  if (fields.length === 0) {
    return cb(null, 0); // কিছুই আপডেট হয়নি
  }

  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
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
  },


getByEmail: (email, cb) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return cb(err);
        cb(null, results[0]);
    });
},




};

module.exports = User;
