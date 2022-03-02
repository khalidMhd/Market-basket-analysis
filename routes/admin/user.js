const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../../models/user')
const adminModel = require('../../models/adminUser')
const userFileModel = require('../../models/file')
const adminLoginRequire = require('../../middleware/adminLoginRequire');
const userIdFromJWT = require('../../middleware/userIdJWT');

//refresh user
router.get('/refresh-admin', adminLoginRequire, (req, res) => {
    if (req.headers && req.headers.authorization) {
        userIdFromJWT(req.headers.authorization).then((result) => {
            if (result._id) {
                const _id = result._id
                adminModel.findOne({ _id: _id }).select("accessLevel accStatus name email").then((result) => {
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

// admin list
router.get("/admin", adminLoginRequire, (req, res) => {
    adminModel.find().sort({ createdAt: -1 }).select("accessLevel accStatus name email createdAt").then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(422).json({ message: "something went wrong!" })
    });
})

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
    userFileModel.find({ user: id }).sort({ createdAt: -1 }).then((result) => {
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

//de-activate user
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