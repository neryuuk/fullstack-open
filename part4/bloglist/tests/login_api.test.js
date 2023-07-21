const helper = require('./test_helper')

describe('POST /api/login', () => {
  beforeEach(helper.resetUsers)

  test('login is succesfull', async () => {
    await helper.api.post('/api/login').send({
      username: 'root',
      password: 'sekret',
    }).expect(200).expect('Content-Type', /application\/json/)
  })

  test('login fails', async () => {
    await helper.api.post('/api/login').send({
      username: 'root',
      password: 'secret',
    }).expect(401).expect('Content-Type', /application\/json/)
  })
})

afterAll(helper.closeConnection)
