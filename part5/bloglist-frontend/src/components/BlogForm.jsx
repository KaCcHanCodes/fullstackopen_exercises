import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const CreateBlog = (event) => {
    event.preventDefault()
    handleCreate({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={CreateBlog}>
      <div>
          title:
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder='title'
        />
        <div>
            author:
          <input
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder='author'
          />
        </div>
        <div>
            url:
          <input
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder='url'
          />
        </div>
        <button type='submit'>create</button>
      </div>
    </form>
  )
}

export default BlogForm