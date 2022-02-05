const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../../models/user')
const requestPremiumModel = require('../../models/requestPremium')
const adminLoginRequire = require('../../middleware/adminLoginRequire')
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const { google } = require('googleapis')
const sendMail = require('../../middleware/email');
const userIdFromJWT = require('../../middleware/userIdJWT');

// get all user
router.get("/user",adminLoginRequire, (req, res) => {
    userModel.find().sort({createdAt:-1}).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(422).json({message:"something went wrong!"})
    });
})

//de-activate user
router.post("/de-activate-user/:id",adminLoginRequire, async (req, res) => {
    const clientId = req.params.id
    const deActivate = await userModel.findOne({ _id: clientId, isVerified: true })
    if (deActivate) {
        deActivate.accStatus = false
        deActivate.save().then(data => {
            return res.status(200).json({ message: "User De-activated" })
        }).catch(err => {
            return res.status(422).json({ message: "Something went wrong!" })
        })
    }
    else {
        return res.status(401).json({ message: "We were unable to update." })
    }
})

router.post("/activate-user/:id",adminLoginRequire, async (req, res) => {
    const clientId = req.params.id
    const deActivate = await userModel.findOne({ _id: clientId, isVerified: true })
    if (deActivate) {
        deActivate.accStatus = true
        deActivate.save().then(data => {
            return res.status(200).json({ message: "User activated" })
        }).catch(err => {
            return res.status(422).json({ message: "Something went wrong!" })
        })
    }
    else {
        return res.status(401).json({ message: "We were unable to update." })
    }
})

module.exports = router