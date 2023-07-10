import { useState } from 'react'

const App = () => {
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filtered, setFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFilter = ({ target }) => {
    setFilter(target.value)
    setFiltered(persons.filter(person => {
      return person.name.toLowerCase().includes(target.value.toLowerCase())
    }))
  }

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
    <div>filter shown with <input value={filter} onChange={handleFilter} /></div>
    <h2>add a new</h2>
    <form>
      <div>name: <input value={newName} onChange={handleNewName} /></div>
      <div>number: <input type='tel' value={newNumber} onChange={handleNewNumber} /></div>
      <div><button onClick={handleAddNewName} type='submit'>add</button></div>
    </form>
    <h2>Numbers</h2>
    {filtered.map(({ name, number }) => <p key={number}>{name} {number}</p>)}
  </div>
}

export default App
