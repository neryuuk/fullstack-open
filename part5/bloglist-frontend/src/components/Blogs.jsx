import { Blog } from './Blog'

const Blogs = ({ blogs, handleLike }) => <ul>
  {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} />)}
</ul>

export default Blogs
