import { Blog } from './Blog'

const Blogs = ({ blogs }) => <ul>
  {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
</ul>

export default Blogs
