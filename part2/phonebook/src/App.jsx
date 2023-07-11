import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Phonebook from './components/Phonebook'
import AddItem from './components/AddItem'
import axios from 'axios'

const App = () => {
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
      setFiltered(response.data)
    }).catch(console.error)
  }, [])

  const handleFilter = ({ target }) => {
    setFilter(target.value)
    setFiltered(persons.filter(matchFilter(target.value)))
  }

  const matchFilter = filter => ({ name }) => name.toLowerCase().includes(filter.toLowerCase())

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

    setPersons(persons.concat(person))
    if (matchFilter(filter)(person)) setFiltered(filtered.concat(person))
    setNewName('')
    setNewNumber('')
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
    <Phonebook items={filtered} />
  </div>
}

export default App
