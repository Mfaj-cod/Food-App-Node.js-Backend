const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.user.id });
        // validation
        if (!user) {
            return res.status(404).send({
                success:false,
                message:'No user found!'
            });
        }
        // hide password
        user.password = undefined
        // respond with data
        return res.status(200).send({
            success:true,
            message:'Successfully Got User Data!',
            user,
        });

    } catch(error) {
        return res.status(500).send({
            success:false,
            message:'Error in getUser API',
            error
        });
    }

    // console.log(req.user.id);
};




const updateUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.user.id });
        // validation
        if (!user) {
            return res.status(404).send({
                success:false,
                message:'User not found!'
            });
        }

        // update
        const { username, phone, address } = req.body

        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        // save user
        await user.save();

        return res.status(200).send({
            success:true,
            message:'User Updated Successfully!',
            new_deatils: user
        });

    } catch(error) {
        return res.status(500).send({
            success:false,
            message:'Error in updateUser API',
            error
        });
    }
};

// Update password
const updateUserPassword = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        // validation
        if (!email || !newPassword || !answer) {
            return res.status(404).send({
                success:false,
                message:'Please provide all fields!'
            });
        }
        // get user
        const user = await userModel.findOne({ email });
        // validation
        if (!user) {
            return res.status(404).send({
                success:false,
                message:'User not found, please provide correct credentials!'
            })
        }

        if (user.answer !== answer) {
            return res.status(401).send({
                success:false,
                message:'Invalid answer!'
            });
        }

        // hashing new_password
        var salt = bcrypt.genSaltSync(10);
        const hashed_password = await bcrypt.hash(newPassword, salt);

        // resetting password
        if (hashed_password) user.password = hashed_password;
        await user.save();

        return res.status(200).send({
            success:true,
            message:'Successfully reset password!'
        });

    } catch(error) {
        return res.status(500).send({
            success:false,
            message:'Error in updatePassword API',
            error
        });
    }
};

module.exports = { getUserController, updateUserController, updateUserPassword };
