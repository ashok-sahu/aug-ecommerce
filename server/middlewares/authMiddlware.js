exports.requireSignin = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    console.log(token,'token')
    const user = jwt.verify(token,process.env.JWT_SECRET)
    console.log(user,'user')
    req.user = user
    next()
  }