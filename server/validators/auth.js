const {check,validationResult} = require('express-validator')

exports.validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("firstname is required!"),
  check("lastName").notEmpty().withMessage("lastname is required!"),
  check("email").isEmail().withMessage("email not valid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be more than 6 characters!"),
];

exports.validateSignInRequest = [
    check("email").isEmail().withMessage("email not valid"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("password must be more than 6 characters!"),
  ];

exports.isRequestValidated = (req,res,next)=>{
    const errors = validationResult(req)
    if(errors.array().length>0){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next()
}