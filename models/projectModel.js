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

  create: ({ users_id, title, description, status, start_date, end_date, image, type, topics }, cb) => {
    const sql = 'INSERT INTO projects (users_id, title, description, status, start_date, end_date, image,type,topics) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)';
    db.query(sql, [users_id, title, description, status, start_date, end_date, image,type,topics], (err, result) => {
      if (err) return cb(err);
      cb(null, result.insertId);
    });
  },

  // update: (id, { users_id, title, description, status, start_date, end_date, image }, cb) => {
  //   const sql = 'UPDATE projects SET users_id=?, title=?, description=?, status=?, start_date=?, end_date=?, image=? WHERE id=?';
  //   db.query(sql, [users_id, title, description, status, start_date, end_date, image, id], (err, result) => {
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
    return cb(null, 0); // কোনো ফিল্ড পাঠানো হয়নি
  }

  const sql = `UPDATE projects SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
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
