const mongoose = require('mongoose')

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    default:100,
    min:100, max:9000,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true
 },
  target: {
    type: String,

   
  },
  customers: [String],
  upcoming:{ type:Boolean},
  success: {type : Boolean, default:true},
})


module.exports =   mongoose.model('Launch', launchesSchema)