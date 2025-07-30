const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : 
    blogs.reduce((sum, blog) => {
        return sum + blog.likes
        }, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const value = Math.max(...likes)
  const index = likes.indexOf(value)

  return blogs[index]
}

module.exports = { dummy, totalLikes, favoriteBlog }