const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(require('../app'))
const SECONDS = 1000
const invalidId = '5a3d5da59070081a82a3445'
const blog = {
  title: 'Yet Another Blog Post',
  author: 'John Doe',
  url: 'https://john.doe/blog/yet-another-blog-post',
  likes: 42,
}

mongoose.set('bufferTimeoutMS', 60 * SECONDS)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(helper.testBlogs.map(blog => new Blog(blog).save()))
}, 15 * SECONDS)

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 15 * SECONDS)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.testBlogs.length)
  }, 15 * SECONDS)

  test('for unique identifier', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  }, 15 * SECONDS)
})

describe('POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).not.toHaveLength(helper.testBlogs.length)
    expect(blogs.map(({ title }) => title)).toContain(blog.title)
  })

  test('if likes is missing defaults to 0', async () => {
    const errorBlog = { ...blog }
    delete errorBlog.likes

    await api
      .post('/api/blogs')
      .send(errorBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).not.toHaveLength(helper.testBlogs.length)
    expect(blogs.map(({ title }) => title)).toContain(errorBlog.title)
  })

  test('if title is missing it fails', async () => {
    const errorBlog = { ...blog }
    delete errorBlog.title

    await api
      .post('/api/blogs')
      .send(errorBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.testBlogs.length)
  })

  test('if url is missing it fails', async () => {
    const errorBlog = { ...blog }
    delete errorBlog.url

    await api
      .post('/api/blogs')
      .send(errorBlog)
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
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length - 1)
    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })

  test('fails with status code 400 if id is invalid', async () => {
    await api
      .delete(`/api/blogs/${invalidId}`)
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
    const updated = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
    expect(updated.body).toEqual(blogToUpdate)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 42
    await api
      .put(`/api/blogs/${invalidId}`)
      .send(blogToUpdate)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
    expect(blogsAtEnd).not.toContainEqual(blogToUpdate)
  })

  test('fails with status code 404 if id is not found', async () => {
    await api
      .put('/api/blogs/000000000000000000000000')
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
