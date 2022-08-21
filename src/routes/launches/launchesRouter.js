const express = require('express')
const launchRouter = express.Router()
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortMission,
} = require('./launchesControllers')

launchRouter.route('/launches')
    .get(httpGetAllLaunches)
    .post(httpAddNewLaunch)
launchRouter.route('/launches/:id').delete(httpAbortMission)
module.exports = launchRouter