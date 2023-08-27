import { useSelector } from 'react-redux'

export const Notification = () => {
  return Object.entries(useSelector(state => state.notification)).map(
    ([id, notif]) => <div key={id} className='notification' >{notif}</div>,
  )
}

export default Notification
