const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const planetRouter = require('./routes/planets/planetRouter')
const launchesRouter = require('./routes/launches/launchesRouter')
const morgan = require('morgan')

app.use(cors())


app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'build')))



app.use('/nasaplanet', planetRouter)
app.use('/nasaplanet', launchesRouter)


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', '/index.html' ))
})

module.exports = app