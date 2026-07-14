const mongoose = require('mongoose');

// Schema
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Category is required!']
    },
    image:{
        type:String,
        default:"url"
    },
    
},
    {timestamps:true}
);

// export
module.exports = mongoose.model('Category', categorySchema);