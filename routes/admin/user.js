const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../../models/user')
const userFileModel = require('../../models/file')
const adminLoginRequire = require('../../middleware/adminLoginRequire')

// get all user
router.get("/user", adminLoginRequire, (req, res) => {
    userModel.find({ isVerified: true }).sort({ createdAt: -1 }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(422).json({ message: "something went wrong!" })
    });
})
// get  user file
router.get("/user-file/:id", adminLoginRequire, (req, res) => {
    const id = req.params.id 
    console.log(id);
    userFileModel.find({user: id}).sort({ createdAt: -1 }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(422).json({ message: "something went wrong!" })
    });
})

//de-activate user
router.post("/de-activate-user/:id", adminLoginRequire, async (req, res) => {
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

router.post("/activate-user/:id", adminLoginRequire, async (req, res) => {
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