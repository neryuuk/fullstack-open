const helper = require('./test_helper')

beforeEach(helper.resetNotes)

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await helper.api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await helper.api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await helper.api.get('/api/notes')
    expect(response.body.map(({ content }) => content))
      .toContain('Browser can execute only JavaScript')
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]
    const resultNote = await helper.api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await helper.api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await helper.api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('fails with status code 401 if not logged in', async () => {
    await helper.api
      .post('/api/notes')
      .send(helper.testNote)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })

  test('succeeds with valid data', async () => {
    await helper.api
      .post('/api/notes')
      .set('Authorization', `Bearer ${await helper.login()}`)
      .send(helper.testNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    expect(notesAtEnd.map(({ content }) => content))
      .toContain('async/await simplifies making async calls')
  })

  test('fails with status code 400 if data invalid', async () => {
    const testNote = { ...helper.testNote }
    delete testNote.content

    await helper.api
      .post('/api/notes')
      .set('Authorization', `Bearer ${await helper.login()}`)
      .send(testNote)
      .expect(400)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]
    await helper.api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
    expect(notesAtEnd.map(({ content }) => content))
      .not.toContain(noteToDelete.content)
  })
})

afterAll(helper.closeConnection)
