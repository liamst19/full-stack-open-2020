const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

const getDecodedToken = request => {
  const token = getTokenFrom(request)
  if(!token) return null
  return decodeToken(token)
}

const decodeToken = token => jwt.verify(token, config.SECRET)

const encodeToken = userForToken => jwt.sign(userForToken, config.SECRET)

const getBearerHeader = userForToken => `Bearer ${ encodeToken(userForToken) }`

module.exports = {
  getTokenFrom,
  getDecodedToken,
  getBearerHeader,
  decodeToken,
  encodeToken
}
