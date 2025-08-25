import { useState, useEffect } from 'react'

const Blog = ({ blog, userId, increaseLikes, removeBlog }) => {
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

  const handleButton = () => {
    setVisible(!visible)
  }

  const show = { display: blog.user.id === userId ? '' : 'none' }

  return (
    <div style={blogStyle} className='blog'>
      { `"${blog.title}" by ${blog.author} ` }
      <button onClick={handleButton}>{visible ? 'hide' : 'view'}</button>

      <div style={{ display: visible ? '': 'none' }}>
        <div>{ `${blog.url}` }</div>

        <div className='likes'>
          { `likes ${blog.likes} ` }
          <button onClick={increaseLikes}>like</button>
        </div>

        <div>{ `${blog.user.name}` }</div>

        <div style={show}>
          <button onClick={removeBlog} style={blogStyle.remove}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog