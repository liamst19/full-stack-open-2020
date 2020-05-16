const bcrypt = require('bcrypt')
const saltRounds = 10 // for encryption

const userRouter = require('express').Router()
const User = require('../models/user')
const blogPopulatePath = { path: 'blogs', select: '-user' }

// For validating input for user creation
const validateInput = (name, username, password) => {
  const PASSWORD_MINCHAR = 3
  const USERNAME_MINCHAR = 3
  let errors = []

  if(!name){
    errors.push('No name given')
  }

  if(!username){
    errors.push('No username given')
  } else if(username.length < USERNAME_MINCHAR){
    errors.push('Username must be at least 3 characters long')
  }

  if(!password){
    errors.push('No password given')
  } else if(password.length < PASSWORD_MINCHAR){
    errors.push('Password must be at least 3 characters long')
  }

  return errors
}

// Create New User
userRouter.post('/', async (request, response) => {
  // Get the required data from request body
  const name = request.body.name
  const username = request.body.username
  const password = request.body.password

  // validate
  const validationErrors = validateInput(name, username, password)
  if(validationErrors && validationErrors.length > 0){
    return response.status(400).json({ error: validationErrors })
  }

  // hash password
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // create new User
  const savedUser = await (new User({
    username, name, passwordHash
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
  const users = await User.find({}).select('-passwordHash').populate(blogPopulatePath)

  return response.json(users)
})

// Get info for particular user with id
userRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const user = await User.findById(id).populate(blogPopulatePath)

  if(user){
    return response.json(user)
  } else {
    return response.status(404).end()
  }
})

module.exports = userRouter
