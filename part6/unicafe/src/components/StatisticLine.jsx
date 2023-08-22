export const StatisticLine = ({ id, text, value }) => (
  <tr id={id}>
    <td id={`text-${id}`}>{text}</td>
    <td id={`value-${id}`}>{value}</td>
  </tr>
)

export default StatisticLine
