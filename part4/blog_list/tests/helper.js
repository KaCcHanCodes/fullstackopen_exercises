const blog = require('../models/blog')

const blogsInDb = async () => {
    const allBlogs = await blog.find({})
    return allBlogs.map(blogs => blogs.toJSON())
}

module.exports = { blogsInDb }