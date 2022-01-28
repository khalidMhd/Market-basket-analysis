const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    updatedBy: {type:Schema.Types.ObjectId, ref:'adminUser'},
    name: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true, minlength: 5},
    accStatus: { type: Boolean, required: true, default: true },
    isPremium: { type: Boolean, required: true, default: false },
    isVerified: { type: Boolean, required: true, default: false },
    resetToken:{ type: String, default: "" },
    expireToken:{ type: Date },
    updatedAt: { type: Date },
    createdAt: {type: Date, default: Date.now}
})

const user = mongoose.model('user', userSchema)
module.exports = user