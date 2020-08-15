const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        status: "failed",
        message: "User already registered",
      });

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          status: "failed",
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          status: "success",
          message: "User created Successfully..!",
        });
      }
    });
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id,role:user.role }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, fullName } = user;

        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({ message: "invalid password!" });
      }
    } else {
      return res.status(400).json({ message: "something wents wrong!" });
    }
  });
};

exports.UsersList = async (req,res)=>{
  const data = await User.find()
  try{
   res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: data.length,
    data: data
  });
  }catch(error){
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
}

