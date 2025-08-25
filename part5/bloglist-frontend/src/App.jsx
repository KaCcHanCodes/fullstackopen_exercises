import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  const handleLogin = async (newUser) => {
    try {
      const user = await loginService.login(newUser)

      window.localStorage.setItem(
        'loggedUserInfo', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  useEffect(() => {
    const loggedUserInfo = window.localStorage.getItem('loggedUserInfo')
    if (loggedUserInfo) {
      const user = JSON.parse(loggedUserInfo)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [user])

  if (user === null) {
    return (
      <div>
        <h2>Login in to application</h2>
        <Notification.errorNotification message = {message} />
        <LoginForm userDetails={handleLogin} />
      </div>
    )
  }
  const handleBlogCreate = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    } catch (exception) {
      setMessage('Some details are missing or incomplete')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  const likesUpdate = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const update = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.modify(id, update)
      setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnedBlog)))

    } catch (exception) {
      setMessage('failed')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const removeBlog = async id => {
    const blog = blogs.find(b => b.id === id)
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return null
    }
    try {
      await blogService.remove(blog.id)
      setMessage(`${blog.title} deleted successfully`)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    } catch (exception) {
      setMessage(`${blog.title} not found`)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserInfo')
    setUser(null)
  }
  //sort blogs by likes before rendering
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification.notification message = {message} />
      <div>
        {`${user.name} logged in `}
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm handleCreate={handleBlogCreate} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          userId={user.id}
          increaseLikes={() => likesUpdate(blog.id)}
          removeBlog={() => removeBlog(blog.id)}
        />)
      }
    </div>
  )
}

export default App