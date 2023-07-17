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

const mostBlogs = blogs => {
  if (!blogs || !blogs.length) return null

  return blogs.reduce((final, post) => {
    const author = final.find(item => item.author === post.author)

    if (!author) final.push({ author: post.author, blogs: 1 })
    else author.blogs += 1

    return final
  }, []).reduce((final, author) => (final.blogs > author.blogs) ? final : author)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
