import { Blog } from './Blog'

const Blogs = ({ user, blogs, handleLike, handleDelete }) => <ul>
  {blogs.map(blog => <Blog {...{ user, blog, handleLike, handleDelete }} key={blog.id} />)}
</ul>

export default Blogs
