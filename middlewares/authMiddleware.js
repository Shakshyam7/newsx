import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect('/login.html');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login.html');
  }
};
