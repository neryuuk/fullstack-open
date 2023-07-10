import Content from './Content'
import Header from './Header'
import Sum from './Sum'

const Course = ({ name, parts }) => <>
  <Header name={name} />
  <Content parts={parts} />
  <Sum parts={parts} />
</>

export default Course
