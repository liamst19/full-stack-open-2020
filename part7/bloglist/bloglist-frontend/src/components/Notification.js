import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const MessageList = ({ messages }) => {
  return(
    <ul>
      { messages.map((message, idx) => {
        return (<li key={`msg_${idx}`}>
          { message }
        </li>)
      })
      }
    </ul>
  )
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
}

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return notification ? (
    <div className={`notification ${notification.type}`}>
      { Array.isArray(notification.message)
        ? <MessageList messages={ notification.message } />
        : notification.message }
    </div>
  ) : null
}

Notification.propTypes = {
  messageType: PropTypes.string
}

export default Notification
