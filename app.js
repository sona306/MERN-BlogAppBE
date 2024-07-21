const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

let app = express()

app.get("/",(req,res)=>{
res.send("hello")
})

app.listen(8080,()=>{
    console.log("Server started")
})