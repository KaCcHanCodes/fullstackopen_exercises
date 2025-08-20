import { useState } from 'react'

const Blog = ({ blog, user, increaseLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    remove: {
      background: 'royalblue'
    }
  }
  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        { `"${blog.title}" by ${blog.author} ` }
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        { `"${blog.title}" by ${blog.author} ` }
        <button onClick={toggleVisibility}>hide</button>
        <div>{ `${blog.url}` }</div>
        <div>
          { `likes ${blog.likes}` }
          <button onClick={increaseLikes}>like</button>
        </div>
        <div>{ `${user}` }</div>
        <button onClick={removeBlog} style={blogStyle.remove}>remove</button>
      </div>
    </div>
  )
}

export default Blog