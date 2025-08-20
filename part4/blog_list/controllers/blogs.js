const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: "token invalid" })
  }
  const user = await User.findById(decodedToken.is)
  if (!user) {
    return response.status(401).json({ error: 'userId not found or invalid'})
  }
  const blogs  = await Blog.find({})
  const filterBlogs = blogs.filter((blog) => blog.user.toString() === user.id.toString())
  response.json(filterBlogs)
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
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.is) {
    return response.status(401).json({ error: "token invalid"})
  }
  const user = await User.findById(decodedToken.is)

  if (!user) {
    return response.status(401).json({ error: 'userId not found or invalid'})
  }
  const blog = new Blog({
    title : title, 
    author: author,
    url: url,
    likes: likes,
    user: user.id
  })
  try {
     const result = await blog.save()
     user.blogs = user.blogs.concat(result._id)
     await user.save()
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
  const blog = await Blog.findById(id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!(decodedToken.is === blog.user.toString())){
    return response.status(401).json({ error: "Invalid token or user"})
  }
  
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = blogRouter