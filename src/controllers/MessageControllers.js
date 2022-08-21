const path = require('path')


const getMessages = (req, res) => {
  res.render('messages', {
    title : 'message page',
    friend : 'pelumi'
  })
}


const postMessages = (req, res) => {
  res.send('thank you jesus for new message')
}



module.exports ={getMessages, postMessages}