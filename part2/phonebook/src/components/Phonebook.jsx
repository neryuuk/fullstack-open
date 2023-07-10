import Person from './Person'

const Phonebook = ({ items }) => <>
  <h2>Numbers</h2>
  {items.map(({ name, number }) => <Person key={number} name={name} number={number} />)}
</>

export default Phonebook
