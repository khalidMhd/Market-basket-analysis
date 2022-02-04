const express = require('express')
const router = express.Router()
var multer = require('multer')
const messageModel = require('../../models/message')
const userIdFromJWT = require('../../middleware/userIdJWT');
const loginRequire = require('../../middleware/requireLogin')

// file uplaid middleware
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads')
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() +"_" + file.originalname )
    }
})

var upload = multer({
    storage: storage,
})

router.post('/message', upload.single('file'), async (req, res, next) => {
    const { message } = req.body
    if (!message) {
        return res.status(422).json({ message: "Please fill all the fields!" })
    } else {
        userIdFromJWT(req.headers.authorization).then((result) => {
            const user = result._id
            const messageDetails = new messageModel({
                user:user,
                message: message
            })
            if (req.file) {
                messageDetails.file = req.file.path
            }

            messageDetails.save().then((rec) => {
                res.status(200).json({ message: "Message send send successfully." })
            }).catch((err) => {
                res.status(422).json({ message: "Something went wrong!" })
            });

        }).catch((err) => {
            res.status(422).json({ message: "Something went wrong!" })
        });

    }

})


module.exports = router
