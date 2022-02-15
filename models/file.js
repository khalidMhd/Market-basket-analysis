const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref:"user"},
    type: {type: Number, require: true }, //1: excel, 2: json
    file: {type: String, require: true },
    createdAt: {type: Date, default: Date.now}
})


const fileModel = mongoose.model('file', fileSchema)
module.exports = fileModel