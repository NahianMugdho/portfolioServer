const db = require('../config/db');

const Blog = {
  getAll: (cb) => {
    db.query('SELECT * FROM blogs', (err, results) => {
      if (err) return cb(err);
      cb(null, results);
    });
  },

  getById: (id, cb) => {
    db.query('SELECT * FROM blogs WHERE id=?', [id], (err, results) => {
      if (err) return cb(err);
      cb(null, results[0]);
    });
  },

  create: ({ users_id, title, content, image_link, published_date }, cb) => {
    const sql = 'INSERT INTO blogs (users_id, title, content,image_link, published_date) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [users_id, title, content, image_link, published_date], (err, result) => {
      if (err) return cb(err);
      cb(null, result.insertId);
    });
  },

  update: (id, { users_id, title, content, image_link, published_date }, cb) => {
    const sql = 'UPDATE blogs SET users_id=?, title=?, content=?, image_link=?, published_date=? WHERE id=?';
    db.query(sql, [users_id, title, content, image_link, published_date, id], (err, result) => {
      if (err) return cb(err);
      cb(null, result.affectedRows);
    });
  },

  delete: (id, cb) => {
    db.query('DELETE FROM blogs WHERE id=?', [id], (err, result) => {
      if (err) return cb(err);
      cb(null, result.affectedRows);
    });
  }
};

module.exports = Blog;
