const http = require('http')
const app = require('./app')
require('dotenv').config()
const PORT = process.env.PORT || 8000
const { connectServer}  = require('./connectDB')

const { loadPlanetData } = require('./model/planetModel')
const { loadLaunchData } = require('./model/launchModel')
const server = http.createServer(app)






const startServer = async() => {
await  connectServer
    await loadPlanetData()
await   loadLaunchData()
    server.listen(PORT, () => {
        console.log(`server is running on port: ${PORT} now....`)
    })
}

startServer()