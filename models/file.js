const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref:"user"},
    type: {type: Number, enum:{1, 2}, require: true,}, //1: json, 2: excel
    file: {type: String, require: true},
    createdAt: {type: Date, default: Date.now}
})


const fileModel = mongoose.model('file', fileSchema)
module.exports = fileModel