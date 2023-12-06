import db from 'connect.js';

// Sign up the user
export const signUp = async (req, res) => {
  const q = `SELECT FROM users WHERE email = ?`;
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
   if(data.length) return res.status(409).json("Email already in use")
  });
};

// Login the user
export const login = async (req, res) => {};
