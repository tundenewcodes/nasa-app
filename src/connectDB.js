const mongoose  = require('mongoose')
// const MONGODB_URL =
//   'mongodb+srv://tunde:tunde2022@cluster0.g7usa11.mongodb.net/?retryWrites=true&w=majority'


// mongoose.connection.once('open',()=>{
//   console.log('mongodb connected...')
// })
// mongoose.connection.on('error',(err)=>{
//   console.error(err)
// })


const connectServer =  mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('db connected')
  }).catch(()=>{
    console.log('error connecting to database')
  })


module.exports = {connectServer}