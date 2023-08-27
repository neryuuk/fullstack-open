/* eslint indent: ['error', 2, { 'SwitchCase': 1 }] */
import Button from './component/Button'
import Display from './component/Display'

const App = () => {
  return <>
    <Display />
    <div>
      <Button type='+' />
      <Button type='-' />
      <Button type='0' />
    </div>
  </>
}

export default App
