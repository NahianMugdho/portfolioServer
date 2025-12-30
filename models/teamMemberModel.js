const db = require('../config/db');

const TeamMember = {
  getAll: (cb) => {
    db.query('SELECT * FROM team_member', (err, results) => {
      if (err) return cb(err);
      cb(null, results);
    });
  },

  getById: (id, cb) => {
    db.query('SELECT * FROM team_member WHERE id=?', [id], (err, results) => {
      if (err) return cb(err);
      cb(null, results[0]);
    });
  },

  create: ({ project_id, name, designation, email }, cb) => {
    const sql = 'INSERT INTO team_member (project_id, name, designation, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [project_id, name, designation, email], (err, result) => {
      if (err) return cb(err);
      cb(null, result.insertId);
    });
  },

  // update: (id, { project_id, name, designation, email }, cb) => {
  //   const sql = 'UPDATE team_member SET project_id=?, name=?, designation=?, email=? WHERE id=?';
  //   db.query(sql, [project_id, name, designation, email, id], (err, result) => {
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

  const sql = `UPDATE team_member SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) return cb(err);
    cb(null, result.affectedRows);
  });
},


  delete: (id, cb) => {
    db.query('DELETE FROM team_member WHERE id=?', [id], (err, result) => {
      if (err) return cb(err);
      cb(null, result.affectedRows);
    });
  }
};

module.exports = TeamMember;
