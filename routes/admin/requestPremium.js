const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../../models/user')
const requestPremiumModel = require('../../models/requestPremium')
const loginRequire = require('../../middleware/requireLogin')
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const { google } = require('googleapis')
const sendMail = require('../../middleware/email');
const userIdFromJWT = require('../../middleware/userIdJWT');

// get request premium
router.get('/request-premium', async (req, res) => {
    requestPremiumModel.find().populate({ path: "user", select: '-password' }).then((result) => {
        if (result) {
            const filterPremium = result.filter((data) => {
                return data?.user?.isPremium === false && data?.user?.isVerified === true
            })
            console.log(filterPremium.length);
            if (filterPremium) {
                return res.status(200).json(filterPremium)
            } else {
                return res.status(422).json({ message: "Data Not Found!" })
            }
        } else {
            return res.status(422).json({ message: "Data Not Found!" })
        }

    }).catch((err) => {
        return res.status(422).json({ message: "Something went wrong!" })
    });
})

// confirm premium
router.post("/confirm-premium/:id", async (req, res) => {
    const clientId = req.params.id
    const adminId = req.body.adminId
    const updatePremium = await userModel.findOne({ _id: clientId, isVerified: true })
    if (updatePremium) {
        updatePremium.updatedBy = adminId
        updatePremium.isPremium = true
        updatePremium.updatedAt = Date.now()

        updatePremium.save().then(data => {
            return res.status(200).json({ message: "Account Updated to Premium" })
        }).catch(err => {
            return res.status(422).json({ message: "Something went wrong!" })
        })
    }
    else {
        return res.status(401).json({ message: "We were unable to update." })
    }
})

// confirm basic
router.post("/confirm-basic/:id", async (req, res) => {
    const clientId = req.params.id
    const adminId = req.body.adminId
    const updateBasic = await userModel.findOne({ _id: clientId, isVerified: true })
    if (updateBasic) {
        updateBasic.updatedBy = adminId
        updateBasic.isPremium = false
        updateBasic.updatedAt = Date.now()

        updateBasic.save().then(data => {
            return res.status(200).json({ message: "Account Updated to Basic" })
        }).catch(err => {
            return res.status(422).json({ message: "Something went wrong!" })
        })
    }
    else {
        return res.status(401).json({ message: "We were unable to update." })
    }
})
 
module.exports = router