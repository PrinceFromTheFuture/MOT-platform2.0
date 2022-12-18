const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({

    cash:{
        type: Number,
    },
    oneZeroBank: {
        type: Number,
    },
    pepperBank: {
        type: Number,
    }
 
})

    balanceSchema.pre('validate', function(next){


next()

})

module.exports = mongoose.model('balanceCollection', balanceSchema)
