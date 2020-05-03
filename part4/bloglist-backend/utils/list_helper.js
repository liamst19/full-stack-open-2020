
const dummy = () => {
  return 1
}
const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((fav, blog) => fav && fav.likes > blog.likes ? fav: blog, null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
