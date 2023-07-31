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

  return <li><p>
    {blog.title} {blog.author} <button onClick={() => setComplete(!complete)}>{complete ? 'hide' : 'view'}</button>
    {complete && <span>
      <br /><a href={blog.url}>{blog.url}</a>
      <br />likes {blog.likes} <button onClick={like}>like</button>
      <br />{blog?.user?.name}
      {canDelete && <><br /><button onClick={remove}>remove</button></>}
    </span>}
  </p></li>
}
