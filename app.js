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