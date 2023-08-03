import PropTypes from 'prop-types'
import { useState } from 'react'

export const Blog = ({ user, blog, handleLike, handleDelete }) => {
  const [complete, setComplete] = useState(false)

  const like = () => {
    const updated = { ...blog }
    updated.likes += 1
    if (blog?.user?.id) updated.user = blog?.user?.id
    handleLike(updated)
  }

  const remove = () => {
    const confirmation = `Remove blog '${blog.title}' ${blog.author ? `by ${blog.author} ` : ''}?`
    if (!window.confirm(confirmation)) return
    handleDelete(blog)
  }

  const canDelete = user.username === blog.user.username

  return <li><p id={`${blog.id}-blog`} className='blog'>
    {blog.title} {blog.author} <button id={`${blog.id}-view-button`} onClick={() => setComplete(!complete)}>{complete ? 'hide' : 'view'}</button>
    {complete && <span>
      <br /><a className='blog-url' href={blog.url}>{blog.url}</a>
      <br /><span className='blog-likes'>likes {blog.likes} <button id={`${blog.id}-like-button`} className='like-button' onClick={like}>like</button></span>
      <br />{blog?.user?.name}
      {canDelete && <><br /><button id={`${blog.id}-remove-button`} className='remove-button' onClick={remove}>remove</button></>}
    </span>}
  </p></li>
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}
