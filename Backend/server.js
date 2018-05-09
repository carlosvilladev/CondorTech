const express = require('express')
const app = express()
const port = 3000

const Providers = require('./models/providers')

app.get('/', (request, response) => {
  Providers.find({})
  .exec(((error, data)=>{
      response.send(data)
  }))
})

app.post('/', (request, response) => {
  
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
