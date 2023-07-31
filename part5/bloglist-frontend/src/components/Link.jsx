import PropTypes from 'prop-types'

export const Link = ({ action, text }) => {
  return <button className="anchor" onClick={action}>{text}</button>
}

Link.propTypes = {
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}
