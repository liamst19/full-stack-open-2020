require('dotenv').config()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
// MONGODB_LOCAL_URI or MONGODB_URI
const MONGODB_URI = NODE_ENV === 'production' ? process.env.MONGODB_URI: NODE_ENV === 'development' ? process.env.MONGODB_LOCAL_URI : process.env.TEST_MONGODB_URI
const SECRET = process.env.SECRET

module.exports = {
  NODE_ENV,
  MONGODB_URI,
  PORT, SECRET
}
