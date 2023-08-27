import { useValue } from '../Context'

const Notification = () => {
  const notification = useValue()

  if (!notification) return null
  return <div className='notification'>{notification}</div>
}

export default Notification
