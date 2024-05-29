const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
 mongoose.connect(process.env.MONGODB_URL)
 .then(()=> console.log("db connected successfully"))
 .catch((error)=>console.log("db connection issue",error))
};

module.exports = connectDB;
