import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Togglable component test', () => {

  test('renders just few details', () => {
    const blog = {
      title: 'Test content',
      author: 'John Doe',
      url: 'https://sjjhd',
      likes: 5,
    }
    render(<Blog blog={blog}/>)

    const div = screen.getByText('"Test content" by John Doe')
    const url = screen.getByText('https://sjjhd')
    const likes = screen.getByText('likes 5')

    expect(div).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('url and likes are visible', async () => {
    const blog = {
      title: 'Test content',
      author: 'John Doe',
      url: 'https://sjjhd',
      likes: 5,
    }
    render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)
    const div = screen.getByText('"Test content" by John Doe')
    const url = screen.getByText('https://sjjhd')
    const likes = screen.getByText('likes 5')
    
    expect(div).toBeVisible()
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('like button is clicked twice', async () => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()

    const blog = {
      title: 'Test content number 2',
      author: 'Jane Doe',
      url: 'https://diplomatic',
      likes: 7,
    }

    render(<Blog blog={blog} increaseLikes={mockHandler}/> )

    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.dblClick(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})