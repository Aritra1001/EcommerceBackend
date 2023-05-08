const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");

//  middleware for jwt (protected routes which we can access only after login)
const requireSignIn = async (req, res, next) => {
  try {
    const verify = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = verify;  // we won't get id in the isAdmin middleware unless we pass verify in req.user
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access
const isAdmin = async(req, res, next)=>{
    try {
        const user = await UserModel.findById({_id: req.user._id});
        if(user.role !== 1){
            res.status(401).send({
                status: false,
                message: "UnAuthorized access"
            })
        }else {
            next();
        }
    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Error in admin middleware"
        })
    }
}

module.exports = {
  requireSignIn,
  isAdmin
};
