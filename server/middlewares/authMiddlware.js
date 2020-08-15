const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token, "token");
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(user, "user");
    req.user = user;
  } else {
    return res.status(400).json({ message: "autherization required!" });
  }
  next();
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(200).json({ message: "💥 User Access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(200).json({ message: "💥 Admin Access denied" });
  }
  next();
};
