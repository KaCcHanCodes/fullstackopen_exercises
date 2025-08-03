require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.TEST_MONGODB_URI)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

  const initialBlog = new Blog({
    title: "The Struggle",
    author: "Charles BikiniBottom",
    likes: 3
  })

initialBlog.save().then((result) => {
    console.log('blog saved!')
    mongoose.connection.close()
})

// Blog.find({}).then((result) => {
//     console.log(result)
//     mongoose.connection.close()
// })