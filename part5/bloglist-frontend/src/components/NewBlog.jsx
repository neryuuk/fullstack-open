const NewBlog = ({ newTitle, newAuthor, newUrl, handleBlog, handleField }) => {
  return <>
    <h2>create new</h2>
    <form onSubmit={handleBlog}>
      <div>
        <label className='blogFields' htmlFor='title'>title:</label>
        <input id='title' type='text' value={newTitle} onChange={handleField} />
      </div>
      <div>
        <label className='blogFields' htmlFor='author'>author:</label>
        <input id='author' type='text' value={newAuthor} onChange={handleField} />
      </div>
      <div>
        <label className='blogFields' htmlFor='url'>url:</label>
        <input id='url' type='text' value={newUrl} onChange={handleField} />
      </div>
      <button type='submit'>create</button>
    </form>
  </>
}

export default NewBlog
