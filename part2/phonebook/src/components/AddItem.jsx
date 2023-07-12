const AddItem = ({ name, number, handleName, handleNumber, handleAdd }) => <>
  <h2>add a new</h2>
  <form>
    <div>
      <label htmlFor='name' >name:</label>&nbsp;
      <input id='name' value={name} onChange={handleName} />
    </div>
    <div>
      <label htmlFor='number' >number:</label>&nbsp;
      <input id='number' type='tel' value={number} onChange={handleNumber} />
    </div>
    <div><button onClick={handleAdd} type='submit'>add</button></div>
  </form>
</>

export default AddItem
