const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.connect(process.env.MONGODB_URI,
                 {
                   useCreateIndex: true,
                   useNewUrlParser: true,
                   useUnifiedTopology: true,
                   useFindAndModify: true
                 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'name must be longer than 2 characters'],
    required: [true, 'name is required'],
    unique: true
  },
  number: {
    type: String,
    validate: {
      validator: num => /^[0-9\-+\s]{8,15}$/.test(num),
      message: props => `${props.value} is not a valid phone number`
    },
    required: [true, 'number is required']
  }
})

// Plugin for validating uniqueness of value within database
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
