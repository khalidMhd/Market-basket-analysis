const express = require('express')
const router = express.Router()
var multer = require('multer')
const messageModel = require('../../models/message')
const userIdFromJWT = require('../../middleware/userIdJWT');
const adminLoginRequire = require('../../middleware/adminLoginRequire')

router.get('/message',adminLoginRequire, (req, res) => {
    messageModel.find().sort({"createdAt": -1}).populate('user', 'name email').then(data => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(422).json({ message: "Something went wrong!" })
    });
})

module.exports = router
