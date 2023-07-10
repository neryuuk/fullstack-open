import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arlo Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNewName = ({ target }) => {
    setNewName(target.value)
  }

  const handleAddNewName = event => {
    event.preventDefault()
    if (persons.some(({ name }) => name === newName)) {
      return window.alert(`${newName} is already added to phonebook`)
    }

    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  return <div>
    <h2>Phonebook</h2>
    <form>
      <div>name: <input value={newName} onChange={handleNewName} /></div>
      <div><button onClick={handleAddNewName} type='submit'>add</button></div>
    </form>
    <h2>Numbers</h2>
    {persons.map(({ name }) => <p key={name}>{name}</p>)}
  </div>
}

export default App
