
const mongoose = require('../connection')
const Schema = mongoose.Schema

const SpecialtySchema = new Schema({
  _class: String,
  name: String,
  createdBy: Number,
  createdAt: {
    type: Date,
    default: Date
  },
  updatedBy: Number,
  updatedAt: Date
})

const SpecialtiesModel = mongoose.model('Specialty', SpecialtySchema)

module.exports = SpecialtiesModel
