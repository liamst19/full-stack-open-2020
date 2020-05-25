
const TOKEN_KEY = 'library-user-token'

export const setTokenToLocal = token => {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

export const getTokenFromLocal = () => {
  const token = window.localStorage.getItem(TOKEN_KEY)
  return token ? JSON.parse(token) : null
}

export const resetTokenInLocal = () => {
  window.localStorage.clear()
}
