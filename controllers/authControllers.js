const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// register
const registerController = async (req, res) => {
    try {
        const {username, email, password, phone, address, usertype} = req.body

        // validation
        if (!username || !email || !password || !phone || !address) {
            return res.status(500).send({
                success:false,
                message:'Please provide all the fields!'
            });
        };
        // existing user check
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(500).send({
                success:true,
                message:'Email already registered, please login!'
            });
        };

        // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashed_password = await bcrypt.hash(password, salt);

        // creating new user
        const user = await userModel.create({
            username,
            email,
            password: hashed_password,
            address,
            phone
        });
        // returning response 
        res.status(201).send({
            success:true,
            message: 'Successfully Registered!',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(200).send({
            success:false,
            message:error.message
        })
    }
};

// login controller
const loginController = async (req, res) => {
    try {
        const {email, password} = req.body

        // validation
        if (!email || !password) {
            return res.status(500).send({
                success:false,
                message:'Please provide both fields!'
            })
        };

        // find user
        const user = await userModel.findOne({ email: email });

        // compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success:false,
                message:'Invalid Credentials'
            });
        }

        // user not found
        if (!user) {
            return res.status(200).send({
                success:true,
                message:'User not found! Please register first.'
            });
        }
        
        // login success
        res.status(200).send({
            success:true,
            message:'Login successful!',
            user
        });

    } catch(error) {
        console.log(error);
        res.status(200).send({
            success:false,
            message:error.message
        })
    };
};

// export
module.exports = { registerController, loginController };
