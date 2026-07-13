const mongoose = require('mongoose')

// schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'user name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true, 'phone number is required']
    },
    usertype:{
        type:String,
        default:'client',
        enum:['client', 'admin', 'vender', 'driver']
    },
    profile:{
        type:String,
        default:'https://png.pngtree.com/png-vector/20221203/ourmid/pngtree-cartoon-style-female-user-profile-icon-vector-illustraton-png-image_6489286.png'
    }
}, {timestamps:true});

// export
module.exports = mongoose.model('User', userSchema);