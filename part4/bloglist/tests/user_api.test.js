const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(helper.resetUsers)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { username: 'neryuuk', name: 'Nelson', password: 'senha' }

    await helper.api.post('/api/users').send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usersAtEnd.map(({ username }) => username))
      .toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { username: 'root', name: 'root', password: 'root' }

    const result = await helper.api.post('/api/users').send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { name: 'Nelson Antunes', password: 'senha' }

    const result = await helper.api.post('/api/users').send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username is missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if name is missing', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { username: 'neryuuk', password: 'senha' }

    const result = await helper.api.post('/api/users').send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('name is missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { username: 'neryuuk', name: 'Nelson Antunes' }

    const result = await helper.api.post('/api/users').send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { username: 'ne', name: 'Nelson', password: 'senha' }

    const result = await helper.api.post('/api/users').send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be 3 or more characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password too short', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { username: 'neryuuk', name: 'Nelson', password: 'se' }

    const result = await helper.api.post('/api/users').send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be 3 or more characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(helper.closeConnection)
