import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonLabel, children, id }, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => { setVisible(!visible) }
  useImperativeHandle(refs, () => { return { toggleVisibility } })

  return <>
    <div id={id} style={hideWhenVisible}>
      <button id={`show-${id}`} onClick={toggleVisibility}>{buttonLabel}</button>
    </div>
    <div id={id} className='togglable' style={showWhenVisible}>
      {children}
      <button id={`hide-${id}`} onClick={toggleVisibility}>cancel</button>
    </div>
  </>
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
