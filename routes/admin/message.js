const express = require('express')
const router = express.Router()
var multer = require('multer')
const messageModel = require('../../models/message')
const userIdFromJWT = require('../../middleware/userIdJWT');

// file uplaid middleware
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname + "_" + Date.now())
    }
})

var upload = multer({
    storage: storage,
})

router.get('/message', (req, res) => {
    messageModel.find().populate('user', 'name email').then(data => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(422).json({ message: "Something went wrong!" })
    });
})

module.exports = router
