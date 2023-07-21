const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const api = require('supertest')(require('../app'))
const Blog = require('../models/blog')
const User = require('../models/user')

mongoose.set('bufferTimeoutMS', 60 * 1000)

const blog = {
  title: 'Yet Another Blog Post',
  author: 'John Doe',
  url: 'https://john.doe/blog/yet-another-blog-post',
  likes: 42,
}

const testBlogs = [{
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
}, {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
}, {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
}, {
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
}, {
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
}, {
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
}]

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  return (await User.find({}))
    .map(user => user.toJSON())
}

const resetBlogs = async () => {
  await resetUsers()
  await Blog.deleteMany({})
  await Blog.insertMany(testBlogs)
}

const resetUsers = async () => {
  await User.deleteMany({})
  await new User({
    username: 'root',
    name: 'root',
    passwordHash: await bcrypt.hash('sekret', 10),
  }).save()
}

const closeConnection = async () => {
  await mongoose.connection.close()
}

module.exports = {
  api,
  blog,
  testBlogs,
  blogsInDb,
  usersInDb,
  resetBlogs,
  resetUsers,
  closeConnection,
}
