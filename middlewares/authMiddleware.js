import jwt from 'jsonwebtoken';
import db from '../connect.js';

// Verifies token
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// Check User
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.local.user = null;
        next();
      } else {
        const q = `SELECT * FROM users WHERE id = ?`;
        db.query(q, [decodedToken.id], (err, result) => {
          if (err) {
            console.log(err);
            res.locals.user = null;
          } else {
            const user = result[0];
            res.locals.user = user;
          }
        });
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export { verifyToken };
