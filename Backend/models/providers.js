const mongoose = require('../connection')
const Schema = mongoose.Schema


let ProvidersSchema = new Schema({
    _id : Number,
    firstname : String,
    middlename : String,
    lastname : String,
    email : String,
    employerId : Number,
    providerType : String,
    staffStatus : String,
    assignedTo : Number,
    status : String,
    createdBy : Number,
    updatedBy : Number,
    projectedStartDate : {
      type : Date
    }

})


const ProvidersModel = mongoose.model("Providers", ProvidersSchema)

module.exports = ProvidersModel
