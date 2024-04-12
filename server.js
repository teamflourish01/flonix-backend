const express=require("express");
const { connection } = require("./db");
require("dotenv").config("")
const cors=require("cors")
const app=express()
app.use(cors({origin:true}))
app.use(express.json())
app.use(express.static("public"))



app.listen("8080",async()=>{
    console.log(`Server is Listening on ${process.env.PORT}`);
    try {
        await connection
        console.log("database connection established");
    } catch (error) {
        
    }
})