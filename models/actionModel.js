const mongoose = require('mongoose')

const actionSchema = new mongoose.Schema({

    createdAt:{
        type: Date,
        default: Date.now
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   
    dateTime: {
        type: Date,
        default: Date.now
    },

    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    MethodsOfPayment: {
        type: String,
        required: true
    },
    budget:{
        type: String
    }

})

actionSchema.pre('validate', function(next){


next()

})

module.exports = mongoose.model('allActionsCollection', actionSchema)
