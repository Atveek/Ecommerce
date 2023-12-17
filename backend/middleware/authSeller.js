const secret = process.env.secret;
const jwt = require("jsonwebtoken");
const authSeller = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    } else {
      if (user.role === "seller") {
        req.user = user;
        next();
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  });
};

module.exports.authSeller = authSeller;
