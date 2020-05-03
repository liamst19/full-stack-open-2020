
const dummy = () => {
  return 1
}
const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((fav, blog) => fav && fav.likes > blog.likes ? fav: blog, null)
}

const mostBlogs = blogs =>  {
  return blogs.reduce((authors, blog) => {
    return authors.some(author => author.name === blog.author)
      ? authors.map(author => author.name === blog.author
        ? {name: author.name, blogs: author.blogs + 1 } : author)
      : [...authors, { name: blog.author, blogs: 1 }]
  }, []).reduce((mostBlogs, author) => mostBlogs && mostBlogs.blogs > author.blogs ? mostBlogs : author, null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
