import { useSelector } from 'react-redux'

export const Notification = () => {
  const notification = useSelector(state => state.notification)

  return notification
    ? <div className='notification'>{notification}</div>
    : null
}

export default Notification
