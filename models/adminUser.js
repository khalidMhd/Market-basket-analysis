const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminUserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true, minlength: 5},   
    accStatus: { type: Boolean, required: true, default: true },
    accessLevel: { type: Number, enum:[1, 2 ], required: true, default: 2 }, // 1:super-admin, 2: sub-admin
    createdAt: {type: Date, default: Date.now}
})

const adminUser = mongoose.model('adminuser', adminUserSchema)
module.exports = adminUser