const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  for(let user of helper.initialUsers){
    const passwordHash = await bcrypt.hash(user.password, 10)
    const addUser = new User({ username: 'root', passwordHash })
    let userObj = new User(addUser)
    await userObj.save()
  }
})

describe('On creation of new user with invalid inputs', () => {
  test('creation fails with proper statuscode and message if username is too short', async () => {
    const newUser = {
      username: 'rb',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('shorter than the minimum allowed length')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const newUser = {
      username: 'kroot',
      name: 'Superuser',
      password: 'sa',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('the password should be longer than 3 characters')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('creation fails with proper statuscode and message if username is not provided', async () => {
    const newUser = {
      name: 'Superuser',
      password: 'salainen',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('`username` is required')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('creation fails with proper statuscode and message if password is not provided', async () => {
    const newUser = {
      username: 'kroot',
      name: 'Superuser',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(500)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})

describe('when there is initially one user in db', () => {
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})