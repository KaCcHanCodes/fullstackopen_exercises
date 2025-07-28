const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogRouter.post('/', (request, response, next) => {
  const { title, author } = request.body
  
  const blog = new Blog({
    title : title, 
    author: author,
  })
  blog.save().then((result) => {
    response.status(200).json(result)
    })
    .catch((error) => next(error))
})

module.exports = blogRouter