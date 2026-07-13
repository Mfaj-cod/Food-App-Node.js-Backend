const userModel = require("../models/userModel");

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
        // creating new user
        const user = await userModel.create({
            username,
            email,
            password,
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
        const user = await userModel.findOne({email, password});

        // user not found
        if (!user) {
            return res.redirect('/register');
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
