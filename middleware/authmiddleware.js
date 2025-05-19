const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization || req.body.token || req.query.token;
    if (!token) {
      return res.status(400).json({ message: "token not found" });
    }
    const decode = jwt.verify(token, "secret");

    req.user = decode;
    next();
  } catch (error) {
    res.status(400).json({ message: "token invalid" });
  }
};
