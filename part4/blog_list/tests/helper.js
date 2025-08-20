const blog = require('../models/blog')
const user = require('../models/user')

const blogsInDb = async () => {
    const allBlogs = await blog.find({})
    return allBlogs.map(blogs => blogs.toJSON())
}

const usersInDb = async () => {
    const allusers = await user.find({})
    return allusers.map(u => u.toJSON())
}

module.exports = { blogsInDb, usersInDb }