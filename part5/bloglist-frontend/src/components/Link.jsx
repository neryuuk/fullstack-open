import PropTypes from 'prop-types'

export const Link = ({ id, action, text }) => {
  return <button id={id} className='anchor' onClick={action}>{text}</button>
}

Link.propTypes = {
  id: PropTypes.string,
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}
