import { useSelector } from 'react-redux'

export const Notification = () => {
  const notifications = useSelector(state => state.notification)

  return notifications.map(notif => <div
    key={`${(Math.random() * 100).toFixed(0)}.${Date.now()}`}
    className='notification'
  >{notif}</div>)
}

export default Notification
