const express = require('express')
const app = express()
const port = 3000

//Routes configuration of all modules
const Routes = require('./config/routes')(app)
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
