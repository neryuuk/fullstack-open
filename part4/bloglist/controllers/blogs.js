const router = require('express').Router()
const Blog = require('../models/blog')

router.route('/').post(async ({ body }, response) => {
  const result = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }).save()

  response.status(201).json(result)
}).get(async (_, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.route('/:id').get(({ params }, response, next) => {
  Blog.findById(params.id).then(blog => {
    if (blog) response.json(blog)
    else next()
  }).catch(error => next(error))
}).put(({ body, params }, response, next) => {
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

  Blog.findByIdAndUpdate(params.id, blog, options)
    .then(updated => response.json(updated))
    .catch(error => next(error))
}).delete(({ params }, response, next) => {
  Blog.findByIdAndRemove(params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

module.exports = router
