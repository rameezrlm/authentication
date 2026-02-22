const express = require("express");
const routes = require("./routes/userRoutes")
const cors = require('cors');
require("dotenv").config();
const connectDB = require("./config/db")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/",routes);

connectDB();


const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log("🔥 Connected to Port successfully");
});