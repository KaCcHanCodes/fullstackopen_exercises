import { useDispatch, useSelector } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  setTimeout(() => {
    dispatch(removeNotification(null))
  }, 5000)

  if (!notification) {
    return null
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification