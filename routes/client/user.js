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

// router.get('/refresh-user', loginRequire, (req, res) => {
//     const id = req.body.id
//     console.log(id);
//     userModel.findOne({_id:id}).then((result) => {
//         res.status(200).json(result)
//     }).catch((err) => {
//         res.status(422).json({ message: "Something went wrong!" })
//     });
// })

router.get('/refresh-user', loginRequire, (req, res) => {
    if (req.headers && req.headers.authorization) {
        userIdFromJWT(req.headers.authorization).then((result) => {
            if (result._id) {
                const _id = result._id
                userModel.findOne({ _id: _id }).select("isPremium accStatus isVerified name email").then((result) => {
                    res.status(200).json(result)
                }).catch((err) => {
                    res.status(422).json({ message: "Something went wrong!" })
                });
            } else {
                res.status(422).json(result)
            }
        }).catch((err) => {
            res.status(422).json({ message: "Something went wrong!" })
        });
    } else {
        res.status(422).json({ message: "Something went wrong!" })
    }
})



module.exports = router