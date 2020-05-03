const listHelper = require('../../utils/list_helper')
const { listWithOneBlog, listWithManyBlogs } = require('../test_helper')

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
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
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
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toBe(listWithManyBlogs[2])
  })

})
