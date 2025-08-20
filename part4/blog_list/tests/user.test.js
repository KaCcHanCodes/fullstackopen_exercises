const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./helper')
const app = require('../app')
const api = supertest(app)

describe('creating a new user', () => {
  test('a user with invalid username cannot be created', async() => {
  const beforeAdd = await helper.usersInDb()
  const newUser = {
    username: 'jo',
    name: 'John Doe',
    password: 'Superstar'
  }

  await api.post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const afterAdd = await helper.usersInDb()
  assert.strictEqual(afterAdd.length, beforeAdd.length)
  })

  test('a user with invalid password cannot be created', async() => {
    const beforeAdd = await helper.usersInDb()
    const newUser = {
      username: 'joee',
      name: 'John Doe',
      password: 'Su'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const afterAdd = await helper.usersInDb()
    assert.strictEqual(afterAdd.length, beforeAdd.length)
  })

})

after(async () => {
  mongoose.connection.close()
})