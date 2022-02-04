const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../../models/adminUser')
const loginRequire = require('../../middleware/requireLogin')
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const { google } = require('googleapis')
const sendMail = require('../../middleware/email')

// sendMail("khalidmehmood1880@gmail.com").then(result => console.log(result)).catch(err => console.log(err))

// register
router.post('/register', async (req, res) => {
    const { name, email, password, accessLevel } = req.body

    if (!name || !email || !password, !accessLevel) {
        return res.status(422).json({ message: "Please fill all the fields!" })
    } else {
        userModel.findOne({ email: email.toLowerCase() }).then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ message: "Email already registered. Take an another email" })
            } else {
                bcrypt.hash(password, 12).then(password => {
                    const userDetails = new userModel({
                        name: name,
                        email: email.toLowerCase(),
                        password: password,
                        accessLevel: parseInt(accessLevel)
                    })
                    userDetails.save().then(user => {
                        const token = jwt.sign({ _id: user._id, accessLevel:user.accessLevel }, process.env.JWT_SECRET)
                        const { _id, name, email } = user
                        return res.status(200).json({ message: "User Registered Successfully.", token, user: { _id, name, email } })
                    }).catch(err => {
                        return res.status(422).json({ message: "Something went wrong!" })
                    })
                }).catch(err => {
                    return res.status(422).json({ message: "Something went wrong!!" })
                })
            }
        }).catch(err => {
            return res.status(422).json({ message: "Something went wrong!" })
        })
    }
})

//login
router.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({ message: "Please fill all the fields!" })
    }
    userModel.findOne({ email: email.toLowerCase() })
        .then(savedUser => {
            if (savedUser) {
                if (savedUser.accStatus === false) {
                    return res.status(422).json({ message: "Account disabled!" })
                } else {
                    bcrypt.compare(password, savedUser.password).then(doMatch => {
                        if (doMatch) {
                            const token = jwt.sign({ _id: savedUser._id, accessLevel:savedUser.accessLevel }, process.env.JWT_SECRET)
                            const { _id, name, email } = savedUser
                            return res.json({ message: "Successfully signed in", token, user: { _id, name, email } })
                        }
                        else {
                            return res.status(422).json({ message: "Invalid Email or password" })
                        }
                    }).catch(err => {
                        return res.status(422).json({ message: "Something went wrong!!!" })
                    })
                }
            } else {
                return res.status(422).json({ message: "Invalid Email or password" })
            }

        }).catch(err => {
            return res.status(422).json({ message: "Something went wrong!" })
        })
})

//change passwort
router.post("/change-password/:id", async (req, res) => {
    const { password, newPassword } = req.body
    const id = req.params.id

    if (!newPassword || !password || !id) {
        return res.status(422).json({ message: "Please fill all the fields!" })
    }
    const changePassord = await userModel.findOne({ _id: id })
    if (changePassord) {

        bcrypt.compare(password, changePassord.password).then(doMatch => {
            if (doMatch) {
                bcrypt.hash(newPassword, 12).then(pwd => {
                    changePassord.password = pwd
                    changePassord.save().then(data => {
                        return res.json({ message: "Password Changed Successfully" })
                    }).catch(err => {
                        return res.status(422).json({ message: "Something went wrong!" })
                    })
                }).catch(err => {
                    return res.status(422).json({ message: "Something went wrong!" })
                })
            } else {
                return res.status(422).json({ error: "Invalid password" })
            }
        }).catch(err => {
            return res.status(422).json({ message: "Something went wrong!" })
        })
    } else {
        return res.status(401).json({ message: "We were unable to update." })
    }
})

module.exports = router