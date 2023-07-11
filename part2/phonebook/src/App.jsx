import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Phonebook from './components/Phonebook'
import AddItem from './components/AddItem'
import { create, read, del } from './services/phonebook'

const App = () => {
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    read().then(data => {
      setPersons(data)
    }).catch(console.error)
  }, [])

  const handleFilter = ({ target }) => {
    setFilter(target.value)
  }

  const matchFilter = person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
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
    const person = { name: newName, number: newNumber }

    create(person).then(data => {
      setPersons(persons.concat(data))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleDelete = id => {
    const toDelete = persons.find(person => person.id === id)
    if (!toDelete) return
    if (!window.confirm(`Delete ${toDelete.name}?`)) return

    del(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  return <div>
    <h2>Phonebook</h2>
    <Filter filter={filter} handleChange={handleFilter} />
    <AddItem
      name={newName}
      handleName={handleNewName}
      number={newNumber}
      handleNumber={handleNewNumber}
      handleAdd={handleAddNewName}
    />
    <Phonebook items={persons.filter(matchFilter)} handleDelete={handleDelete} />
  </div>
}

export default App
