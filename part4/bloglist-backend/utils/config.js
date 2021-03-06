require('dotenv').config()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
// MONGODB_LOCAL_URI or MONGODB_URI
const MONGODB_URI = NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_LOCAL_URI
const SECRET = process.env.SECRET

module.exports = {
  NODE_ENV,
  MONGODB_URI,
  PORT, SECRET
}
