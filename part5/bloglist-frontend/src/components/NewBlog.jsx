import { useState, forwardRef, useImperativeHandle } from 'react'

const NewBlog = forwardRef(({ handleBlog }, refs) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    handleBlog({ title: newTitle, author: newAuthor, url: newUrl })
  }

  const handleField = ({ target }) => {
    const methods = {
      title: setNewTitle,
      author: setNewAuthor,
      url: setNewUrl,
    }

    methods[target.id](target.value)
  }

  const clearFields = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  useImperativeHandle(refs, () => { return { clearFields } })

  return <>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
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
})

export default NewBlog
