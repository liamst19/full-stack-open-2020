
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')
const { initialUsers } = require('./utils/test_helper_users')

const User = require('../models/user')

const API_PATH = '/api/login'

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
})

describe('login', () => {

  test('succeeds with valid credentials', async () => {
    await api
      .post(API_PATH)
      .send({
        username: 'testuser1',
        password: 'testuserpassword1'
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('successful response contains token', async () => {
    const response = await api
      .post(API_PATH)
      .send({
        username: 'testuser1',
        password: 'testuserpassword1'
      })

    expect(response.body.name).toBeDefined()
    expect(response.body.username).toBeDefined()
    expect(response.body.token).toBeDefined()
  })

  test('fails with invalid credentials', async () => {
    await api
      .post(API_PATH)
      .send({
        username: 'testuser1',
        password: 'wrongpassword'
      })
      .expect(401)
  })
})
