const Person = ({ name, number, handleDelete }) => <p>
  <button onClick={handleDelete}>delete</button>&nbsp;
  {name}&nbsp;{number}
</p>

export default Person
