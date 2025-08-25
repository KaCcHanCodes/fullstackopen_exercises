import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates the form and calls event handler', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm handleCreate={mockHandler} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  await user.type(titleInput, 'Just another day')
  await user.type(authorInput, 'John Secada')
  await user.type(urlInput, 'https://jonsecada just another day/')
  screen.debug()

  const button = screen.getByText('create')
  await user.click(button)


  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Just another day')
  expect(mockHandler.mock.calls[0][0].author).toBe('John Secada')
  expect(mockHandler.mock.calls[0][0].url).toBe('https://jonsecada just another day/')
})