const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const userModel = require("./Models/users")

let app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://sonasabu:sonavi306@cluster0.ejzjjq6.mongodb.net/mernblogappdb?retryWrites=true&w=majority&appName=Cluster0")

//signin
app.post("/signin",async(req,res)=>{
    let input = req.body
    let result = userModel.find({email:req.body.email}).then(
        (items)=>{
            if (items.length>0) {
                const passwordValidator = bcrypt.compareSync(req.body.password,items[0].password)
                if (passwordValidator) {
                    
                    jsonwebtoken.sign({email:req.body.email},"blogApp",{expiresIn:"1d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status":"Error","errorMessage":error})
                            } else {
                                res.json({"status":"Success","token":token,"userId":items[0]._id})
                            }
                    })

                } else {
                    res.json({"status":"Incorrect Password"})
                }
            } else {
                res.json({"status":"Invalid Email Id"})
            }
        }
    ).catch()
})



//signup
app.post("/signup", async (req, res) => {

    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password, 10)
    console.log(hashedPassword)
    req.body.password = hashedPassword

    userModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "Email id already exits" })
            } else {
                let result = new userModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    ).catch(
        (error) => {

        }
    )




})

app.listen(8080, () => {
    console.log("Server started")
})