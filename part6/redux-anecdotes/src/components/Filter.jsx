import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

export const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = ({ target }) => {
    dispatch(filter(target.value))
  }

  return <div id='filter'>
    <label>
      filter&nbsp;
      <input onChange={handleChange} />
    </label>
  </div>
}

export default Filter
