const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref:"user"},
    message: {type: String},
    file: {type: String},
    createdAt: {type: Date, default: Date.now}
})


const messageModel = mongoose.model('message', messageSchema)
module.exports = messageModel