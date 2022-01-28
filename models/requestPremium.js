const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestPremiumSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref:"user"},
    createdAt: {type: Date, default: Date.now}
})


const requestPremiumModel = mongoose.model('req-premium', requestPremiumSchema)
module.exports = requestPremiumModel