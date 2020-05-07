
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, 'username must be longer than 3 characters'],
    unique: true
  },
  name:     {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  blogs: [{ type: mongoose.ObjectId, ref: 'Blog' }]
})

// Plugin for validating uniqueness of value within database
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)
