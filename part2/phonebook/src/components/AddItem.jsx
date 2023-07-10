const AddItem = ({ name, number, handleName, handleNumber, handleAdd }) => <>
  <h2>add a new</h2>
  <form>
    <div>name: <input value={name} onChange={handleName} /></div>
    <div>number: <input type='tel' value={number} onChange={handleNumber} /></div>
    <div><button onClick={handleAdd} type='submit'>add</button></div>
  </form>
</>

export default AddItem
