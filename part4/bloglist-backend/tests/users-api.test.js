const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')
const { initialUsers, sampleNewUser, getUsersInDb, getNonExistingId } = require('./utils/test_helper_users.js')

const User = require('../models/user')

const API_PATH = '/api/user'

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
})

describe('when there are users in db', () => {

  test('GET request returns a json with status 200', async () => {
    await api.get(API_PATH)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get(API_PATH)
    expect(response.body.length).toBe(initialUsers.length)
  })

  test('returned user data contains property "id" and not "_id"', async () => {
    const response = await api.get(API_PATH)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
  })

  test('a specific user is returned within returned data', async () => {
    const response = await api.get(API_PATH)
    const usernames = response.body.map(user => user.username)
    expect(usernames).toContain('testuser5')
  })

})

describe('creating new user', () => {

  test('valid data return successful with json object', async () => {
    await api
      .post(API_PATH)
      .send(sampleNewUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('successful response contains id and no password', async () => {
    const newUserResponse = await api
      .post(API_PATH)
      .send(sampleNewUser)

    expect(newUserResponse.body.id).toBeDefined()
    expect(newUserResponse.body.name).toBe('New User Sample')
    expect(newUserResponse.body.username).toBe('samplenewuser')
    expect(newUserResponse.body.password).not.toBeDefined()
  })

  test('database contains one more entry than initial', async () => {
    const newUserResponse = await api
      .post(API_PATH)
      .send(sampleNewUser)

    const users = await getUsersInDb()
    expect(users.length).toBe(initialUsers.length + 1)
    expect(users.map(user => user.id)).toContain(newUserResponse.body.id)
    expect(users.map(user => user.name)).toContain(newUserResponse.body.name)
  })

  test('sending without name fails with status 400', async () => {
    const newUserData = {
      username: 'new user name',
      password: 'newpassword'
    }

    await api
      .post(API_PATH)
      .send(newUserData)
      .expect(400)
  })

  test('sending without username fails with status 400', async () => {
    const newUserData = {
      name: 'new name',
      passowrd: 'newpassword'
    }

    await api
      .post(API_PATH)
      .send(newUserData)
      .expect(400)
  })

  test('sending without password fails with status 400', async () => {
    const newUserData = {
      username: 'new user name',
      name: 'new name'
    }

    await api
      .post(API_PATH)
      .send(newUserData)
      .expect(400)
  })

  test('username must be at least 3 characters long', async () => {
    const newUserData = {
      username: 'us',
      name: 'new name',
      password: 'newpassword'
    }

    await api
      .post(API_PATH)
      .send(newUserData)
      .expect(400)

  })

  test('password must be at least 3 characters long', async () => {
    const newUserData = {
      username: 'newusername',
      name: 'new name',
      password: 'np'
    }

    await api
      .post(API_PATH)
      .send(newUserData)
      .expect(400)
  })

  test('username must be unique', async () => {
    const newUserData = {
      username: 'testuser3',
      name: 'new name',
      password: 'newpassword'
    }

    await api
      .post(API_PATH)
      .send(newUserData)
      .expect(400)
  })

})
