const helper = require('./test_helper')
const invalidId = '5a3d5da59070081a82a3445'

beforeEach(helper.resetBlogs)

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await helper.api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await helper.api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.testBlogs.length)
  })

  test('for unique identifier', async () => {
    const response = await helper.api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const blog = { ...helper.blog, userId: (await helper.usersInDb())[0].id }
    await helper.api.post('/api/blogs').send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).not.toHaveLength(helper.testBlogs.length)
    expect(blogs.map(({ title }) => title)).toContain(blog.title)
  })

  test('if likes is missing defaults to 0', async () => {
    const blog = { ...helper.blog, userId: (await helper.usersInDb())[0].id }
    delete blog.likes

    await helper.api.post('/api/blogs').send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const newItem = blogs.find(({ title }) => title === blog.title)
    expect(blogs).not.toHaveLength(helper.testBlogs.length)
    expect(newItem?.title).toEqual(blog.title)
    expect(newItem?.likes).toEqual(0)
  })

  test('if title is missing it fails', async () => {
    const blog = { ...helper.blog, userId: (await helper.usersInDb())[0].id }
    delete blog.title

    await helper.api.post('/api/blogs').send(blog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.testBlogs.length)
  })

  test('if url is missing it fails', async () => {
    const blog = { ...helper.blog, userId: (await helper.usersInDb())[0].id }
    delete blog.url

    await helper.api.post('/api/blogs').send(blog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.testBlogs.length)
  })

  test('if userId is missing it fails', async () => {
    const blog = { ...helper.blog }

    await helper.api.post('/api/blogs').send(blog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.testBlogs.length)
  })
})

describe('DELETE /api/blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await helper.api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length - 1)
    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })

  test('fails with status code 400 if id is invalid', async () => {
    await helper.api.delete(`/api/blogs/${invalidId}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
  })
})

describe('PUT /api/blogs', () => {
  test('succeeds with status code 200', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 42
    const updated = await helper.api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
    expect(updated.body).toEqual(blogToUpdate)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 42
    await helper.api.put(`/api/blogs/${invalidId}`).send(blogToUpdate)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
    expect(blogsAtEnd).not.toContainEqual(blogToUpdate)
  })

  test('fails with status code 404 if id is not found', async () => {
    await helper.api.put('/api/blogs/000000000000000000000000')
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
  })
})

afterAll(helper.closeConnection)
