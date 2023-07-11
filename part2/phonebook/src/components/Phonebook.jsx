import Person from './Person'

const Phonebook = ({ items, handleDelete }) => <>
  <h2>Numbers</h2>
  {items.map(({ id, name, number }) => <Person
    key={id}
    name={name}
    number={number}
    handleDelete={() => handleDelete(id)}
  />)}
</>

export default Phonebook
