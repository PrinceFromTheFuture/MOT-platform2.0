const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({

    Clothing:{
        type: Number,
    },
    Transportation: {
        type: Number,
    },
    Spendings: {
        type: Number,
    },
    Enrichment: {
        type: Number,
    },
    Gifts: {
        type: Number,
    },
    UWFE:{
        type: Number
    },
    Savings:{
        type: Number
    }

})

budgetSchema.pre('validate', function(next){


next()

})

module.exports = mongoose.model('budgetCollection', budgetSchema)
