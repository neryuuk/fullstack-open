import { useState } from 'react'

export const Blog = ({ blog, handleLike }) => {
  const [complete, setComplete] = useState(false)

  const like = () => {
    const updated = { ...blog }
    updated.likes += 1
    if (blog?.user?.id) updated.user = blog?.user?.id
    handleLike(updated)
  }

  return <li><p>
    {blog.title} {blog.author} <button onClick={() => setComplete(!complete)}>{complete ? 'hide' : 'view'}</button>
    {complete && <span>
      <br /><a href={blog.url}>{blog.url}</a>
      <br />likes {blog.likes} <button onClick={like}>like</button>
      <br />{blog?.user?.name}
    </span>}
  </p></li>
}
