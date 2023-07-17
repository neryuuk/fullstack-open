const dummy = blogs => { return 1 || blogs.length }

const totalLikes = blogs => {
  if (!blogs || !blogs.length) return 0
  return blogs.reduce((total, { likes }) => total + likes, 0)
}

const favoriteBlog = blogs => {
  if (!blogs || !blogs.length) return null

  const result = blogs.reduce((fav, post) => (fav.likes > post.likes) ? fav : post)

  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  }
}

module.exports = { dummy, totalLikes, favoriteBlog }
