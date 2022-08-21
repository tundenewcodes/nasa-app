const express = require('express')
const planetRouter = express.Router()
const httpGetAllPlanet = require('./planetController')




planetRouter.route('/planets').get(httpGetAllPlanet)


module.exports = planetRouter