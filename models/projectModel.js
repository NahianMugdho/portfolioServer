const db = require('../config/db');

const Project = {
  getAll: (cb) => {
    const sql = 'SELECT * FROM projects';
    db.query(sql, (err, results) => {
      if (err) return cb(err);
      cb(null, results);
    });
  },

  getById: (id, cb) => {
    const sql = 'SELECT * FROM projects WHERE id=?';
    db.query(sql, [id], (err, results) => {
      if (err) return cb(err);
      cb(null, results[0]);
    });
  },

  create: ({ users_id, title, description, status, start_date, end_date, image }, cb) => {
    const sql = 'INSERT INTO projects (users_id, title, description, status, start_date, end_date, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [users_id, title, description, status, start_date, end_date, image], (err, result) => {
      if (err) return cb(err);
      cb(null, result.insertId);
    });
  },

  update: (id, { users_id, title, description, status, start_date, end_date, image }, cb) => {
    const sql = 'UPDATE projects SET users_id=?, title=?, description=?, status=?, start_date=?, end_date=?, image=? WHERE id=?';
    db.query(sql, [users_id, title, description, status, start_date, end_date, image, id], (err, result) => {
      if (err) return cb(err);
      cb(null, result.affectedRows);
    });
  },

  delete: (id, cb) => {
    const sql = 'DELETE FROM projects WHERE id=?';
    db.query(sql, [id], (err, result) => {
      if (err) return cb(err);
      cb(null, result.affectedRows);
    });
  }
};

module.exports = Project;
