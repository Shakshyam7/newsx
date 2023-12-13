import db from '../connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import e from 'express';

// Sign up the user
export const signUp = async (req, res) => {
  console.log('Incoming signup req');
  const q = `SELECT * FROM users WHERE email = ?`;
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    // checks if the data is returned
    else if (data.length)
      return res.status(409).json({ error: 'Email already in use' });
    else {
      // hash the password before saving to the db
      const salt = bcrypt.genSaltSync(10);
      const hashPw = bcrypt.hashSync(req.body.password, salt);
      const q = `INSERT INTO users (name, phone, email, password) VALUE(?)`;
      const values = [req.body.name, req.body.phone, req.body.email, hashPw];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({
          user: 'User successfully registered. Please login',
        });
      });
    }
  });
};

// Login the user
export const login = async (req, res) => {
  console.log('Incoming login req');
  const q = `SELECT * FROM users WHERE email = ?`;
  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      return res.status(401).json('Wrong email or password');
    }
    // checks if the data is empty as query with unregistered email will send empty data
    else if (data.length === 0) {
      return res.status(404).json('Email does not exists');
    }
    // checks the hased pw with the user pw
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!checkPassword) {
      return res.status(401).json('Wrong email or password');
    }
    // Sending the user data expect password
    const { password, ...userData } = data[0];
    // sends the jwt as a cookie
    const accessToken = jwt.sign({ id: data[0].id }, process.env.SECRET_KEY);
    res.cookie('jwt', accessToken, { expiresIn: '7d', httpOnly: true });
    return res.status(200).json({ userData });
  });
};

// Log outs the user
export const logout = (req, res) => {
  try {
    console.log(' Incoming logout req');
    res.clearCookie('jwt');
    return res.status(200).json({ user: null });
  } catch (error) {
    console.log(error);
  }
};
