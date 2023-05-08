const {UserModel} = require('../model/userModel'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const password = "Aritra@123";

const passwordHash = async (password)=>{
    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds); 
        return hashPassword;
    } catch (error) {
        console.log(error);
    }
};

const isCorrectPassword =  (password, hashPassword)=>{
    return bcrypt.compare(password, hashPassword);
};

// const hash1 = passwordHash(password);
// console.log("hash", hash1);

const signup = async(req, res)=>{
    console.log("signup is called...");
    // const bodyvalue = await  req.body;
    // console.log(bodyvalue);
    const {name, email, password, phone} = req.body; 
   
    try {
        // user validation
        if(!name || !email || !password || !phone){
            res.status(403).send("Please enter complete details to signup");
        }

        // check existinguser- we don't want the same email to be registred again and again
        const existingUser = await UserModel.findOne({email: email});
        if(existingUser){
           return res.status(200).send({message: "User already exists, please login"});
        }

        // hashing password
        const hashPass = await passwordHash(password);

        // saving user
        const user = await new UserModel({
            name, 
            email,
            password: hashPass,
            phone
        }).save();

        res.status(200).send({
            success: true,
            message: "User signedUp successfully",
            user
        })


    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:"Some error occurred while performing signup"});
    }
 }

const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

        // validation
        if(!email || !password){
            return res.status(403).send("Please enter email and password");
        }

        //check user in db using email
        const userFound = await UserModel.findOne({email: email});
        if(!userFound){
            return res.status(404).send({message: "User is not registered"});
        }

        // checking the user is same or not
        const isSamePass = await isCorrectPassword(password, userFound.password);
        if(!isSamePass){
            return res.status(200).send({message: "Invalid email or password, please try again later"});
        }
        // res.status(200).send({message: "User loggedin successfully"});

        // creating token
        const token = jwt.sign({_id: userFound._id}, process.env.JWT_SECRET, {expiresIn: '2d'});
        res.status(200).send({
            success: true,
            message: "User loggedIn successfully",
            user: {
                name: userFound.name,
                email: userFound.email,
                phone: userFound.phone
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error occurred while logging in",
            error
        })
    }
    
}

const testFunc = (req, res)=>{
    res.send({message: "Protected Routes"});
}

module.exports = {
    signup,
    login,
    testFunc
}