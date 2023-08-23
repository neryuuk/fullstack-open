import { Radio } from './Radio'

export const Filter = () => {
  const className = 'filter'
  return <div className={className}>
    <Radio checked={true} id='all' text='all' name={className} />
    <Radio id='important' text='important' name={className} />
    <Radio id='nonimportant' text='nonimportant' name={className} />
  </div>
}

export default Filter
