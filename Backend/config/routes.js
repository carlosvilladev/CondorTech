const ProvidersRoutes = require('../models/providers/providers-router')
const bodyParser = require('body-parser')

module.exports = (app)=>{    
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use('/providers', ProvidersRoutes)
}