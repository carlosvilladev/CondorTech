const express = require('express')
const Router = express.Router()
const Providers = require('./providers-controller')

Router.get('/', Providers.getAll)
Router.get('/:id', Providers.getById)
Router.put('/:id', Providers.updateProvider)
Router.post('/', Providers.saveProvider)
Router.delete('/:id', Providers.deleteProvider)

module.exports = Router