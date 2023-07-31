import PropTypes from 'prop-types'
import { Blog } from './Blog'

const Blogs = ({ user, blogs, handleLike, handleDelete }) => <ul>
  {blogs.map(blog => <Blog {...{ user, blog, handleLike, handleDelete }} key={blog.id} />)}
</ul>

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blogs
