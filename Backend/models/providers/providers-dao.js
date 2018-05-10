const mongoose = require('../../config/connection')
const ProvidersSchema = require('./providers-schema')

ProvidersSchema.statics.getAll = () => {
  return Providers.find()
}

ProvidersSchema.statics.getById = (id) => {
  return Providers.findById(id)
}

ProvidersSchema.statics.updateProvider = (id, body) => {  
  up = Providers.update({_id : id}, { $set: body}).exec()
  return up
}

ProvidersSchema.statics.deleteProvider = (id) => {  
  del = Providers.deleteOne({_id : id}).exec()
  return del  
}

const Providers = mongoose.model('Providers', ProvidersSchema)

module.exports = Providers