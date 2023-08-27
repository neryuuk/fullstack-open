import { useDispatch } from 'react-redux'
import { toggleFilter } from '../reducers/filterReducer'

export const Radio = ({ id, text, name, checked }) => {
  const dispatch = useDispatch()
  const filterSelected = () => {
    dispatch(toggleFilter(id.toUpperCase()))
  }

  return <label className='radio-option' id={`label-${id}`} htmlFor={`radio-${id}`}>
    {text}&nbsp;
    <input defaultChecked={checked} className={`cl-${id}`} id={`radio-${id}`} type='radio' name={name} onChange={filterSelected} />
  </label>
}
