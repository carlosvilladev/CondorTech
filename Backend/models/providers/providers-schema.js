const mongoose = require('../../config/connection')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp')

const ProvidersSchema = new Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  employerId: Number,
  providerType: String,
  staffStatus: String,
  assignedTo: Number,
  status: String,
  createdBy: Number,
  updatedBy: Number,
  projectedStartDate: {
    type: Date,
    default: Date.now
  },
  specialty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialty'
  },
  created: {
    type: Date,
    default: Date.now
  }

})

ProvidersSchema.plugin(timestamp)

module.exports = ProvidersSchema
