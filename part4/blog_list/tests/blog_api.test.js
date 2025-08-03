const {test, after} = require('node:test')
const assert = require('node:assert/strict')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./helper')

const api = supertest(app)

const initialBlog = [
  {
    title: 'Beau',
    author: 'Chima Amara',
    likes: 7,
    id: '688d02d6bc31c443093d87c8'
  },
  {
    title: 'The Struggle',
    author: 'Charles BikiniBottom',
    likes: 3,
    id: '688d0352dd0800046cfd295a'
  }
]

test('all blog posts', async () => {
  await api.get('/api/blogs')
  .expect(200)
  .expect('Content-type', /application\/json/)
})

test('id is the unique identifier', async () => {
  const response = await api.get(`/api/blogs/688d02d6bc31c443093d87c8`)
  assert.deepStrictEqual(response.body, initialBlog[0])
})

// test('successfully created a new blog post', async ()=> {
//   const newBlog = {
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10
//   }
//   await api.post('/api/blogs')
//           .send(newBlog,)
//           .expect(201)
//           .expect('Content-type', /application\/json/)
//   const blogs = await api.get('/api/blogs')
//   const title = blogs.body.map(t => t.title)
//   assert(title.includes('First class tests'))
//   assert.strictEqual(blogs.body.length, (initialBlog.length + 1))
// })

test('delete a blog post', async () => {
  const blogStart = await helper.blogsInDb()
  const blogToDelete = blogStart[2]
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  const blogEnd = await helper.blogsInDb()
  const title = blogEnd.map(t => t.title)

  assert(!title.includes("The Struggle"))
  assert.strictEqual(blogEnd.length, 2)
})

test('update the likes of a blog post', async () => {
  const blogs = await helper.blogsInDb()
  const blogToUpdate = blogs[0]
  const updatedData = {
    ...blogToUpdate, likes: 17
  }
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedData).expect(200)

  const updatedBlogs = await helper.blogsInDb()
  const newBlog = updatedBlogs.find(blog => blog.id === blogToUpdate.id)

  assert.strictEqual(newBlog.likes, 17)
})

after(async () => {
    await mongoose.connection.close()
})