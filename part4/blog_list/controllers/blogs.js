const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const blog = await Blog.findById(id)
    response.json(blog)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  
  const blog = new Blog({
    title : title, 
    author: author,
    url: url,
    likes: likes
  })
  try {
     const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const {likes} = request.body
  const blog = await Blog.findById(id)
  if (blog) {
    blog.title = blog.title
    blog.author = blog.author
    blog.url = blog.url
    blog.likes = likes

    const updatedBlog = await blog.save()
    return response.json(updatedBlog)
  }
  return response.status(404).end()
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = blogRouter