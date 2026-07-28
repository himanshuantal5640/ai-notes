const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Databse");
    }
    catch(err){
        console.log("Database connection is failed");
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;