import { useState } from 'react'

export const Blog = ({ blog }) => {
  const [complete, setComplete] = useState(false)

  return <li><p>
      {blog.title} {blog.author} <button onClick={() => setComplete(!complete)}>{complete ? 'hide' : 'view'}</button>
      {complete && <span>
        <br /><a href={blog.url}>{blog.url}</a>
        <br />likes {blog.likes} <button>like</button>
        <br />{blog?.user?.name}
      </span>}
    </p></li>
}
