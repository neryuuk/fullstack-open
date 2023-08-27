import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { get, post, put } from './services/requests'

const App = () => {
  const client = useQueryClient()
  const newNote = useMutation(post, {
    onSuccess: newNote => {
      const notes = client.getQueryData(['notes'])
      client.setQueryData(['notes'], notes.concat(newNote))
    },
  })
  const updateNote = useMutation(put, {
    onSuccess: (_, updated) => {
      const notes = client.getQueryData(['notes'])
      client.setQueryData(['notes'], notes.map(note => {
        return note.id === updated.id ? updated : note
      }))
    },
  })

  const addNote = async event => {
    event.preventDefault()
    newNote.mutate({ content: event.target.note.value, important: false })
    event.target.note.value = ''
  }

  const toggleImportance = note => {
    updateNote.mutate({ ...note, important: !note.important })
  }

  const result = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['notes'],
    queryFn: get,
  })

  if (result.isLoading) return <h2>loading data...</h2>

  const notes = result.data || []

  return <div>
    <h2>Notes app</h2>
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
    {notes.map(note =>
      <li key={note.id} onClick={() => toggleImportance(note)}>
        {note.content}
        <strong> {note.important ? 'important' : ''}</strong>
      </li>,
    )}
  </div>
}

export default App
