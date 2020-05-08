const listHelper = require('../utils/list_helper')
const { sampleBlogs } = require('./utils/test_helper_blogs')

const listWithOneBlog = [sampleBlogs[0]]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(sampleBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBeNull()
  })

  test('when list has only one blog favorite blog is that one', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[0])
  })

  test('of a bigger list is evaluated right', () => {
    const result = listHelper.favoriteBlog(sampleBlogs)
    expect(result).toBe(sampleBlogs[2])
  })

})

describe('author with most blogs', () => {

  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBeNull()
  })

  test('when list has only one blog author is that one', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toStrictEqual({
      name: 'Michael Chan',
      blogs: 1
    })
  })

  test('of a bigger list is evaluated correctly', () => {
    const result = listHelper.mostBlogs(sampleBlogs)
    expect(result).toStrictEqual({
      name: 'Robert C. Martin',
      blogs: 3
    })
  })

})
