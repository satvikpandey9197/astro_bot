const mongoose = require('mongoose')

const donation_schema = new mongoose.Schema({
    userID: { type: String },
    serverID: { type: String },
    donation: { type: Number },

}) 
const model = mongoose.model('donation_schema_data', donation_schema)

module.exports = model