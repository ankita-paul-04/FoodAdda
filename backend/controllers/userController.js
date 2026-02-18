import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return (jwt.sign({ id }, process.env.JWT_TOKEN));
}


//login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        //if the user does not exist
        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        //if the password is not matched
        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        //if user exist
        const token = createToken(user._id);
        res.json({ success: true, token , message : "User is loged in successfully"})

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "User login is failed for some reason" })
    }

}

//signUp
const signUp = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        //if the user is already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exist" });
        }

        //validate email id and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email ID" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password more than 7 characters" });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //register the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        const user = await newUser.save();

        //sending web token
        const token = createToken(user._id);
        res.json({ success: true, token , message : "User is loged in successfully"});

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "User registration is failed for some reason" });
    }

}




export { login, signUp };