const bcrypt = require('bcrypt')
const saltRounds = 10 // for encryption

const jwt = require('jsonwebtoken')

const userRouter = require('express').Router()
const User = require('../models/user')

// Create New User
userRouter.post('/', async (request, response) => {
  // Get the required data from request body
  const name = request.body.name
  const username = request.body.username
  const password = request.body.password

  // validate
  if(!name || !username || !password){
    return response.status(400).send('incomplete information')
  }

  // hash password
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // create new User
  const savedUser = await (new User({
    username, name, password: passwordHash
  })).save()

  return response
    .status(201)
    .json({
      name: savedUser.name,
      username: savedUser.username,
      id: savedUser.id
    })
})

// Get a list of all users
userRouter.get('/', async (request, response) => {

  const users = await User.find({}).select('-passwordHash')

  return response.json(users)
})

// Get info for particular user with id
userRouter.get('/:id', async (request, response) => {

  const id = request.params.id

  // validate
  if(!id){ // no id
    return response.status(400).end()
  } // todo: check if id string is valid ObjectId

  const user = await User.findById(request.params.id)

  if(user){
    return response.json(user)
  } else {
    return response.status(404).end()
  }
})

module.exports = userRouter
