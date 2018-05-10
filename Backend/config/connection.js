const mongoose = require('Mongoose')

let connection = null
let db = null
connection = mongoose.connect('mongodb://foundation123:foundation123@ds125146.mlab.com:25146/foundation-test1')
db = mongoose.connection

db.once('open', () => {
  console.log('Base de datos abierta')
})

module.exports = mongoose
