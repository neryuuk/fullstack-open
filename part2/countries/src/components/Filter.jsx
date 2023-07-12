const Filter = ({ filter, handleChange }) => (
  <div>
    <label htmlFor='filter'>find countries</label>&nbsp;
    <input id='filter' value={filter} onChange={handleChange} />
  </div>
)

export default Filter
