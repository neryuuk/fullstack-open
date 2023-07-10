import Content from './Content'
import Header from './Header'
import Sum from './Sum'

const Course = ({ course }) => <>
  <Header name={course.name} />
  <Content parts={course.parts} />
  <Sum parts={course.parts} />
</>

export default Course
