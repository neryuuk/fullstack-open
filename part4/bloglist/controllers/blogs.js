const router = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

router.route('/').post(userExtractor, async ({ body, user }, response) => {
  if (!body.title) return response.status(400).json({ error: 'title is missing' })
  if (!body.url) return response.status(400).json({ error: 'url is missing' })

  const userFromDB = await User.findById(user)
  const result = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: userFromDB.id,
  }).save()
  userFromDB.blogs = userFromDB.blogs.concat(result._id)
  await userFromDB.save()

  response.status(201).json(result)
}).get(async (_, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

router.route('/:id').get(async ({ params }, response, next) => {
  const blog = await Blog.findById(params.id)
  if (blog) response.json(blog)
  else next()
}).put(async ({ body, params }, response, next) => {
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const options = {
    new: true,
    runValidators: true,
    context: 'query',
  }

  const updated = await Blog.findByIdAndUpdate(params.id, blog, options)
  if (updated) response.json(updated)
  else next()
}).delete(userExtractor, async ({ params, user }, response) => {
  const blog = await Blog.findById(params.id)
  if (!blog) return response.status(404).json({ error: 'item not found' })
  if (blog?.user?.toString() !== user) return response.status(401).json({ error: 'that blog is not yours to delete' })
  await Blog.findByIdAndRemove(params.id)
  response.status(204).end()
})

module.exports = router
