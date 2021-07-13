const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    watchList:{
        type: [String]
    }
})

module.exports = mongoose.model('User', userSchema)