const cookieParser = require("cookie-parser");
const express = require("express");
const app = express()
const routes = require("./routes/UserRoute")
const dbconnect = require("./config/Database")
 
require("dotenv").config();

const port = process.env.PORT || 5000;
dbconnect();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",routes)

app.get("/",(req,res)=>{
    res.send("maja ma")
})

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})