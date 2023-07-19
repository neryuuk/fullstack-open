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

describe('/api/blogs', () => {
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

  afterAll(async () => {
    await mongoose.connection.close()
  })
})
