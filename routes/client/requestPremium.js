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

// request premium

router.post('/request-premium', (req, res) => {
    if (req.headers && req.headers.authorization) {
        userIdFromJWT(req.headers.authorization).then((result) => {
            if (result._id) {
                const user = result._id
                requestPremiumModel.findOne({user: user}).then((rec) => {
                    if (!rec) {
                        requestPremiumModelDetals = new requestPremiumModel({
                            user: result._id
                        })
                        requestPremiumModelDetals.save().then((result) => {
                            res.status(200).json({ message: "Request sended, wait for confirmation." })
                        }).catch((err) => {
                            res.status(422).json({ message: "Some-thing went wrong!" })
                        });
                    }
                    else {
                        res.status(200).json({ message: "Your are already premium user!" })
                    }
                }).catch((err) => {
                    res.status(422).json({ message: "Some-thing went wrong!" })
                });
            } else {
                res.status(422).json(result)
            }
        }).catch((err) => {
            res.status(422).json({ message: "Some-thing went wrong!" })
        });
    } else {
        res.status(422).json({ message: "Some-thing went wrong!" })
    }
})

module.exports = router