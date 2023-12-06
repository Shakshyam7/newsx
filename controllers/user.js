import db from 'connect.js';
import bcrypt from 'bcrypt';

// Sign up the user
export const signUp = async (req, res) => {
  const q = `SELECT FROM users WHERE email = ?`;
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    else if (data.length) return res.status(409).json('Email already in use');
    else {
      // hash the password before saving to the db
      const salt = bcrypt.genSaltSync(10);
      const hashPw = bcrypt.hashSync(req.body.password, salt);
      const q = `INSERT INTO users ('name', 'phone', 'email', password) VALUE(?)`;
      const values = [req.body.name, req.body.phone, req.body.phone, hashPw]
    }
  });
};

// Login the user
export const login = async (req, res) => {};
