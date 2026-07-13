const mongoose = require('mongoose')
const dotenv = require('dotenv')

// dotenv configuration
dotenv.config();

// function for mongo db connection
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to db: ${mongoose.connection.host}`);
    } catch(error) {
        console.log("DB error:", error);
    }
};

module.exports = connectdb;