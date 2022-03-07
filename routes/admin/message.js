const express = require('express')
const router = express.Router()
var multer = require('multer')
const messageModel = require('../../models/message')
const userIdFromJWT = require('../../middleware/userIdJWT');
const adminLoginRequire = require('../../middleware/adminLoginRequire')
const paginatedResults = require('../../middleware/pagination')

router.get('/message', adminLoginRequire, (req, res) => {
    messageModel.find().sort({ "createdAt": -1 }).populate('user', 'name email').then(data => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(422).json({ message: "Something went wrong!" })
    });
})

// confirm premium
router.post("/confirm-msg-read/:id", adminLoginRequire, async (req, res) => {
    const id = req.params.id
    const readMessage = await messageModel.findOne({ _id: id })
    if (readMessage) {
        readMessage.isRead = true
        readMessage.save().then(data => {
            return res.status(200).json({ message: "Changes Updated" })
        }).catch(err => {
            return res.status(422).json({ message: "Something went wrong!" })
        })
    }
    else {
        return res.status(401).json({ message: "We were unable to update." })
    }
})


module.exports = router
