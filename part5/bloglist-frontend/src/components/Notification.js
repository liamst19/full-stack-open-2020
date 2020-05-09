import React from 'react'
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

const Notification = ({ message, messageType }) => {
  return message && messageType ? (
    <div className={`notification ${messageType}`}>
      { Array.isArray(message)
        ? <MessageList messages={ message } />
        : message }
    </div>
  ) : null
}

Notification.propTypes = {
  messageType: PropTypes.string
}

export default Notification
