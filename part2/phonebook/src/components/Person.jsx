const Person = ({ name, number, handleDelete }) => <p>
  {name}&nbsp;{number}&nbsp;
  <button onClick={handleDelete}>delete</button>
</p>

export default Person
