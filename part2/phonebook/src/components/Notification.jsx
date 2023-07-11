const Notification = ({ message, error }) => {
  return message
    ? <div className={error ? 'error' : 'notification'}>{message}</div>
    : null
}

export default Notification
