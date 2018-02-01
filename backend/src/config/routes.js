const express = require('express')

module.exports = function(server) {

    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // REACT APP Routes
    const reactAppService = require('../api/react-app/reactAppService')
    reactAppService.register(router, '/react-apps')
}

