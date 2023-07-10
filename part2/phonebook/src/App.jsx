import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arlo Hellas', number: '040-1234567' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = ({ target }) => {
    setNewName(target.value)
  }

  const handleNewNumber = ({ target }) => {
    setNewNumber(target.value)
  }

  const handleAddNewName = event => {
    event.preventDefault()
    if (persons.some(({ name }) => name === newName)) {
      return window.alert(`${newName} is already added to phonebook`)
    }

    setPersons(persons.concat({
      name: newName,
      number: newNumber
    }))
    setNewName('')
    setNewNumber('')
  }

  return <div>
    <h2>Phonebook</h2>
    <form>
      <div>name: <input value={newName} onChange={handleNewName} /></div>
      <div>number: <input type='tel' value={newNumber} onChange={handleNewNumber} /></div>
      <div><button onClick={handleAddNewName} type='submit'>add</button></div>
    </form>
    <h2>Numbers</h2>
    {persons.map(({ name, number }) => <p key={number}>{name} {number}</p>)}
  </div>
}

export default App
