import React from 'react'
import { useSelector } from 'react-redux'
// import { resetNotification } from '../reducers/notificationReducer'

const Notification = () => {
  // const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  // Reset after 5 seconds
  // if(notification.type !== 'init'){
  //   const TIMEOUT = 5000
  //   window.setTimeout(() => {
  //     dispatch(resetNotification())
  //   }, TIMEOUT)
  // }

  const notificationColor = notification.type === 'error' ? 'red' : 'green'

  const hiddenStyle = {
    display: 'none'
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: notificationColor,
    color: notificationColor
  }

  return (
    <div style={ notification.type === 'init' ? hiddenStyle : style}>
      { notification.text }
    </div>
  )
}

export default Notification
