export const Link = ({ action, text }) => {
  return <button className="anchor" onClick={action}>{text}</button>
}
