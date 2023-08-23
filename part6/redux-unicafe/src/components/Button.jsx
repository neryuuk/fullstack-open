export const Button = ({ id, action, text }) => (
  <button id={id} onClick={action}>{text}</button>
)

export default Button
