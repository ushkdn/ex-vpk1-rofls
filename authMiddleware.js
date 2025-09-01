const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    req.user = jwt.verify(token, "supersecretkeyjsisshit");
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};