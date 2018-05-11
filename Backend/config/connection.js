const mongoose = require('Mongoose')

let connection = null
let db = null
//Connection to MongoDB with the mLab URI set by env var
connection = mongoose.connect(process.env.MLAB_ENV)
db = mongoose.connection

db.once('open', () => {
  console.log('Base de datos abierta')
})

module.exports = mongoose
