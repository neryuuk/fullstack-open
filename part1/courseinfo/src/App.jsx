const Header = (p) => (<h1>{p.course}</h1>)
const Part = (p) => (<p>{p.part} {p.exercises}</p>)
const Content = (p) => (<div>
  <Part part={p.part1.name} exercises={p.part1.exercises} />
  <Part part={p.part2.name} exercises={p.part2.exercises} />
  <Part part={p.part3.name} exercises={p.part3.exercises} />
</div>)
const Total = (p) => (
  <p>Number of exercises {p.exercises1 + p.exercises2 + p.exercises3}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  )
}

export default App
