const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Database Connected");
}

module.exports = connectDB;