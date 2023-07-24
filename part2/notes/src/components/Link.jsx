const Link = ({ action, text }) => {
  return <button className="anchor" onClick={action}>{text}</button>
}

export default Link
