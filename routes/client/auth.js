const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../../models/user')
const loginRequire = require('../../middleware/requireLogin')
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const { google } = require('googleapis')
const sendMail = require('../../middleware/email')

// sendMail("khalidmehmood1880@gmail.com").then(result => console.log(result)).catch(err => console.log(err))

// register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(422).json({ message: "Please fill all the fields!" })
    } else {
        userModel.findOne({ email: email.toLowerCase() }).then((savedUser) => {
            if (savedUser) {
                if (savedUser.isVerified === false) {
                    return res.status(422).json({ message: "Email not verified" })
                }
                if (savedUser.isVerified === true) {
                    return res.status(422).json({ message: "Email already registered. Take an another email" })
                }
                if (savedUser.accStatus === false) {
                    return res.status(422).json({ message: "Account disabled!" })
                }
            } else {
                bcrypt.hash(password, 12).then(password => {
                    const userDetails = new userModel({
                        name: name,
                        email: email.toLowerCase(),
                        password: password,
                    })

                    userDetails.save().then(user => {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                        const { _id, name, email } = user

                        const subject = "Email Verification"
                        const html = `<p>Click on link to verify your account: <br>
                        <a href="http://${process.env.HOST}/account/confirm/${token}">http://${process.env.HOST}/account/confirm/${token}</a> </p>`

                        sendMail(email, html, subject).then(result => {
                            console.log(result)
                        }).catch(err => {
                            console.log(err);
                            return res.status(422).json({ message: "Something went wrong!" })
                        })
                        return res.status(200).json({ message: "A verification mail has been sent.", token, user: { _id, name, email } })
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
    userModel.findOne({ email: email?.toLowerCase(), accStatus: true }).then(savedUser => {
        if (savedUser) {
            if (savedUser.isVerified === false) {
                return res.status(422).json({ message: "Email not verified" })
            }
            if (savedUser.accStatus === false) {
                return res.status(422).json({ message: "Account disabled!" })
            } else {
                bcrypt.compare(password, savedUser.password).then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET)
                        const { _id, name, email } = savedUser
                        return res.json({ message: "Successfully signed in", token, user: { _id, name, email } })
                    }
                    else {
                        return res.status(422).json({ message: "Invalid Email or password" })
                    }
                }).catch(err => {
                    return res.status(422).json({ message: "Something went wrong!" })
                })
            }
        } else {
            return res.status(422).json({ message: "User not registered" })
        }

    }).catch(err => {
        return res.status(422).json({ message: "Something went wrong!" })
    })
})

// verify token/user
router.post("/confirmation/:token", async (req, res) => {
    const token = req.params.token
    var authorization = token, decoded;
    try {
        decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (e) {
        return res.status(401).send({ message: 'unauthorized User' });
    }
    var userId = decoded._id;
    const verifyUser = await userModel.findOne({ _id: userId, isVerified: false })
    if (verifyUser) {
        verifyUser.isVerified = true
        verifyUser.save().then(data => {
            return res.status(200).json({ message: "User verified successfully" })
        }).catch(err => {
            return res.status(422).json({ message: "Something went wrong!" })
        })
    }
    else {
        return res.status(401).json({ message: "We were unable to find a valid token." })
    }
})

//reset password
router.post('/reset-password', (req, res) => {
    const email = req.body.email
    if (!email) {
        return res.status(422).json({ message: "Please fill all the fields!" })
    }
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log("errrrrrr" + err)
        }
        const token = buffer.toString("hex")
        userModel.findOne({ email: email.toLowerCase() }).then(user => {
            if (!user) {
                return res.status(422).json({ message: "User dont exists with that email" })
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000 // 1hour

            user.save().then((result) => {
                const html = `<p>We received a request to reset the password for your account.</p>
                                <p>To reset your password, Click the bellow link.</p> 
                                <h5><a href="http://localhost:3000/reset/${token}">Clink me, to reset password</a></h5>`
                const subject = "Password Reset"
                sendMail(email?.toLowerCase(), html, subject).then(result => {
                    console.log(result)
                }).catch(err => {
                    return res.status(422).json({ message: "Something went wrong!" })
                })
                return res.status(200).json({ message: "Check your email" })
            }).catch(error => {
                return res.status(422).json({ message: "Something went wrong!" })
            })
        }).catch(error => {
            return res.status(422).json({ message: "Something went wrong!" })
        })
    })
})

//new password
router.post('/new-password', (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    if (!newPassword || !sentToken) {
        return res.status(422).json({ message: "Please fill all the fields!" })
    }
    userModel.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                return res.status(422).json({ message: "Try again session expired" })
            }
            bcrypt.hash(newPassword, 12).then(hashedpassword => {
                user.password = hashedpassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((saveduser) => {
                    return res.status(200).json({ message: "password updated success" })
                }).catch(err => {
                    return res.status(422).json({ message: "Something went wrong!" })
                })
            })
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
    const changePassord = await userModel.findOne({ _id: id, isVerified: true })
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
    }
    else {
        return res.status(401).json({ message: "We were unable to update." })
    }
})

module.exports = router