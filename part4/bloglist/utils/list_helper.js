const dummy = (blogs) => {
  return 1 || blogs.length
}

const totalLikes = (posts) => {
  if (!posts || !posts.length) return 0
  return posts.reduce((total, { likes }) => total + likes, 0)
}

module.exports = { dummy, totalLikes }
