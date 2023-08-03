import PropTypes from 'prop-types'

export const Link = ({ id, action, text }) => {
  return <button id={id} className="anchor" onClick={action}>{text}</button>
}

Link.propTypes = {
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default Link
