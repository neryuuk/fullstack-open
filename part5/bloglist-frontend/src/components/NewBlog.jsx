export const NewBlog = ({ title, author, url, handleNote, handleField }) => {
  return <form onSubmit={handleNote}>
    <div>
      <label className='blogFields' htmlFor='title'>title:</label>
      <input id='title' type='text' value={title} onChange={handleField} />
    </div>
    <div>
      <label className='blogFields' htmlFor='author'>author:</label>
      <input id='author' type='text' value={author} onChange={handleField} />
    </div>
    <div>
      <label className='blogFields' htmlFor='url'>url:</label>
      <input id='url' type='text' value={url} onChange={handleField} />
    </div>
    <button type='submit'>create</button>
  </form>
}
