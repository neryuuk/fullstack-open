const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(require('../app'))
const SECONDS = 1000

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
    const blog = {
      title: 'Yet Another Blog Post',
      author: 'John Doe',
      url: 'https://john.doe/blog/yet-another-blog-post',
      likes: 42,
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).not.toHaveLength(helper.testBlogs.length)
    expect(blogs.map(({ title }) => title)).toContain(blog.title)
  })

  test('missing field likes defaults to 0', async () => {
    const blog = {
      title: 'Yet Another Blog Post',
      author: 'John Doe',
      url: 'https://john.doe/blog/yet-another-blog-post',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).not.toHaveLength(helper.testBlogs.length)
    expect(blogs.map(({ title }) => title)).toContain(blog.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
