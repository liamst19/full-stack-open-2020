const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')
const { getInitialBlogsWithUserId, sampleNewBlog, getBlogsInDb, getNonExistingId } = require('./utils/test_helper_blogs.js')
const { initialUsers } = require('./utils/test_helper_users.js')
const { getBearerHeader } = require('../utils/token')

const Blog = require('../models/blog')
const User = require('../models/user')

const API_PATH = '/api/blogs'

let usersInDb = []
let initialBlogs = []
let bearer = null

beforeAll(async () => {
  await User.deleteMany({})
  usersInDb = await User.insertMany(initialUsers)
  initialBlogs = getInitialBlogsWithUserId(usersInDb)
  bearer = getBearerHeader({
    username: usersInDb[0].username,
    id: usersInDb[0].id
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  if(!initialBlogs || initialBlogs.length < 1){
    throw 'initial blogs are empty'
  }
  await Blog.insertMany(initialBlogs)
})

afterAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  mongoose.connection.close()
})

describe('when there are initially some blogs saved', () => {

  test('blogs are returned as json with status code 200', async () => {
    await api.get(API_PATH)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get(API_PATH)
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('returned blog entry contains property "id" and not "_id"', async () => {
    const response = await api.get(API_PATH)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
  })

  test('returned blog entry contains property "user"', async () => {
    const response = await api.get(API_PATH)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body[0].user).toBeDefined()
    expect(response.body[0].user.id).toBeDefined()
    expect(response.body[0].user.username).toBeDefined()
    expect(response.body[0].user.name).toBeDefined()
    expect(response.body[0].user.password).not.toBeDefined()
    expect(response.body[0].user.passwordHash).not.toBeDefined()
  })

  test('a specific blog is returned within returned blogs', async () => {
    const response = await api.get(API_PATH)
    const contents = response.body.map(blog => blog.title)
    expect(contents).toContain('Canonical string reduction')
  })

})

describe('adding a new blog', () => {

  test('success with valid data responds with the new blog entry', async () => {
    const newBlogResponse = await api
      .post(API_PATH)
      .set('Authorization', bearer)
      .send(sampleNewBlog)
      .expect(201)

    expect(newBlogResponse.body.id).toBeDefined()
  })

  test('success results with one more entry in db', async () => {
    await api
      .post(API_PATH)
      .set('Authorization', bearer)
      .send(sampleNewBlog)
    const blogs = await getBlogsInDb()
    expect(blogs.length).toBe(initialBlogs.length + 1)
    expect(blogs.map(blog => blog.title)).toContainEqual(sampleNewBlog.title)
  })

  test('success adds blog id to user object', async () => {
    const newBlogResponse = await api
      .post(API_PATH)
      .set('Authorization', bearer)
      .send(sampleNewBlog)

    const userid = newBlogResponse.body.user
    const user = await User.findById(userid)
    expect(user.blogs.map(blog => blog.toString())).toContain(newBlogResponse.body.id)
  })

  test('fails with 401 for no authorization token', async () => {
    await api
      .post(API_PATH)
      .send(sampleNewBlog)
      .expect(401)
  })

  test('fails with 401 for invalid authorization token', async () => {
    const invalidId = await getNonExistingId(usersInDb[0].id)
    await api
      .post(API_PATH)
      .set('Authorization', getBearerHeader({ username: 'wrongname', id: invalidId}))
      .send(sampleNewBlog)
      .expect(401)
  })

  test('fails with 401 for malformed authorization token', async () => {
    await api
      .post(API_PATH)
      .set('Authorization', 'Bearer badtoken')
      .send(sampleNewBlog)
      .expect(401)
  })

  test('sending data without like property will default to 0', async () => {
    const newBlogEntry = {
      title: 'New Unliked Blog Title',
      author: 'Unliked Author',
      url: 'http://facebook.com'
    }
    const response = await api
      .post(API_PATH)
      .set('Authorization', bearer)
      .send(newBlogEntry)
      .expect(201)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })

  test('fails with 400 for no title and author ', async () => {
    const newBlogEntry = {
      url: 'http://facebook.com'
    }
    await api
      .post(API_PATH)
      .set('Authorization', bearer)
      .send(newBlogEntry)
      .expect(400)
  })

})

describe('getting a blog with id', () => {

  test('success with a valid id', async () => {
    const blogs = await getBlogsInDb()
    const id = blogs[0].id
    const response = await api
      .get(API_PATH + '/' + id)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(blogs[0].title)
  })

  test('fails with 404 for invalid id', async () => {
    const invalidId = await getNonExistingId(usersInDb[0].id)
    await api
      .get(API_PATH + '/' + invalidId)
      .expect(404)
  })
})

describe('updating a blog entry', () => {

  test('success with a valid id', async () => {
    const blogs = await getBlogsInDb()
    const id = blogs[0].id
    const user = await User.findById(blogs[0].user)
    const updateData = {
      title: 'Updated Blog Title',
      author: 'Updike Update II',
      likes: 99
    }
    await api
      .put(API_PATH + '/' + id)
      .set('Authorization', getBearerHeader({username: user.username, id: user.id}))
      .send(updateData)
      .expect(200)
  })

  test('success results with new data in db', async () => {
    const blogs = await getBlogsInDb()
    const oldBlogData = blogs[0]
    const user = await User.findById(blogs[0].user)
    const updateData = {
      title: 'Updated Blog Title',
      author: 'Updike Update II',
      likes: 99
    }

    await api
      .put(API_PATH + '/' + oldBlogData.id)
      .set('Authorization', getBearerHeader({username: user.username, id: user.id}))
      .send(updateData)

    const blogsAfter = await getBlogsInDb()
    expect(blogsAfter.map(blog => blog.title)).toContain('Updated Blog Title')
    expect(blogsAfter.map(blog => blog.title)).not.toContain(oldBlogData.title)
    expect(blogsAfter.map(blog => blog.author)).toContain('Updike Update II')
    expect(blogsAfter.map(blog => blog.author)).not.toContain(oldBlogData.title)
  })

  test('fails with 404 for invalid id', async () => {
    const invalidId = await getNonExistingId(usersInDb[0].id)
    const updateData = {
      title: 'Updated Blog Title',
      author: 'Updike Update II',
      likes: 99
    }
    await api
      .put(API_PATH + '/' + invalidId)
      .set('Authorization', getBearerHeader({ username: usersInDb[3].username, id: usersInDb[3].id }))
      .send(updateData)
      .expect(404)
  })

  test('fails with 401 for wrong user token', async () => {
    const blogs = await getBlogsInDb()
    const id = blogs[0].id
    const wronguser = usersInDb.filter(user => user.id.toString() !== blogs[0].user.toString())[0]
    const updateData = {
      title: 'Updated Blog Title',
      author: 'Updike Update II',
      likes: 99
    }
    await api
      .put(API_PATH + '/' + id)
      .set('Authorization', getBearerHeader({username: wronguser.username, id: wronguser.id}))
      .send(updateData)
      .expect(401)
  })

})

describe('liking a blog', () => {
  test('success with a valid id', async () => {
    const blogs = await getBlogsInDb()
    const origBlog = blogs[0]
    const id = origBlog.id
    await api
      .put(API_PATH + '/like/' + id)
      .expect(200)
  })

  test('success results with incremented like in db', async () => {
    const blogs = await getBlogsInDb()
    const origBlog = blogs[0]
    const id = origBlog.id
    const likes = origBlog.likes
    await api
      .put(API_PATH + '/like/' + id)
      .expect(200)

    const blog = await Blog.findById(id)
    expect(blog.likes).toBe(likes + 1)
  })

  test('fails with 404 for invalid blog id', async () => {
    const invalidId = await getNonExistingId(usersInDb[0].id)
    await api
      .put(API_PATH + '/like/' + invalidId)
      .expect(404)
  })

})

describe('deleting a blog', () => {

  test('success with a valid id', async () => {
    const blogsBeforeDelete = await getBlogsInDb()
    const id = blogsBeforeDelete[0].id
    const user = await User.findById(blogsBeforeDelete[0].user)

    await api
      .delete(API_PATH + '/' + id)
      .set('Authorization', getBearerHeader({username: user.username, id: user.id}))
      .expect(204)
  })

  test('success results with one less blog in db', async () => {
    const blogsBeforeDelete = await getBlogsInDb()
    const id = blogsBeforeDelete[0].id
    const user = await User.findById(blogsBeforeDelete[0].user)

    await api
      .delete(API_PATH + '/' + id)
      .set('Authorization', getBearerHeader({username: user.username, id: user.id}))
      .expect(204)

    const blogsAfterDelete = await getBlogsInDb()

    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1)
    const ids = blogsAfterDelete.map(blog => blog.id)
    expect(ids).not.toContain(id)
  })

  test('fails with 404 for invalid blog id', async () => {
    const invalidId = await getNonExistingId(usersInDb[0].id)
    await api
      .delete(API_PATH + '/' + invalidId)
      .set('Authorization', bearer)
      .expect(404)
  })

  test('fails with 401 for no authorization token', async () => {
    const blogsBeforeDelete = await getBlogsInDb()
    const id = blogsBeforeDelete[0].id
    await api
      .delete(API_PATH + '/' + id)
      .send(sampleNewBlog)
      .expect(401)
  })

  test('fails with 401 for wrong user token', async () => {
    const blogsBeforeDelete = await getBlogsInDb()
    const id = blogsBeforeDelete[0].id
    const wronguser = usersInDb.filter(user => user.id.toString() !== blogsBeforeDelete[0].user.toString())[0]
    await api
      .delete(API_PATH + '/' + id)
      .set('Authorization', getBearerHeader({ username: wronguser.username, id: wronguser.id }))
      .send(sampleNewBlog)
      .expect(401)
  })

  test('fails with 401 for invalid authorization token', async () => {
    const blogsBeforeDelete = await getBlogsInDb()
    const id = blogsBeforeDelete[0].id
    await api
      .delete(API_PATH + '/' + id)
      .set('Authorization', getBearerHeader({ username: 'wrongname', id: id}))
      .send(sampleNewBlog)
      .expect(401)
  })

  test('fails with 401 with malformed authorization token', async () => {
    const blogsBeforeDelete = await getBlogsInDb()
    const id = blogsBeforeDelete[0].id
    await api
      .delete(API_PATH + '/' + id)
      .set('Authorization', 'Bearer badtoken')
      .send(sampleNewBlog)
      .expect(401)
  })

})
