const Sum = ({ parts }) => (
  <strong>total of {parts.reduce((sum, { exercises }) => sum + exercises, 0)} exercises</strong>
)

export default Sum
