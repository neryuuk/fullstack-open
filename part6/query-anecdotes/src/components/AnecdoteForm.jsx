const AnecdoteForm = () => {

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
  }

  return <div>
    <h3>create new</h3>
    <form onSubmit={onCreate}>
      <div>
        <input name='anecdote' id='anecdote' />
        <button className='btn-submit' type='submit'>create</button>
      </div>
    </form>
  </div>
}

export default AnecdoteForm
