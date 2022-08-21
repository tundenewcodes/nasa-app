const  friends = require('../model/friends')
const getAllFriends = (req, res) => {
  res.status(200).json(friends)
}

const addAFriend = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'invalid input / name parameter not provided',
    })
  }
  const newFriends = { name: req.body.name, id: friends.length }
  friends.push(newFriends)
  console.log(newFriends)
  res.status(200).json(friends)
}


const getAFriend = (req, res) => {
  const id = +req.params.id
  const friend = friends[id]
  if (!friend) {
    res.status(404).json({
      error: 'friend does not exist',
    })
  }
  res.json(friend)
}



module.exports = {getAllFriends, addAFriend, getAFriend}
