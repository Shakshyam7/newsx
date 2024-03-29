import jwt from 'jsonwebtoken';

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
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

export { verifyToken };
