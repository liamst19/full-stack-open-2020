import React from 'react'

const MessageList = ({messages}) => {
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

const Notification = ({ message, messageType }) => {
  return message && messageType ? (
    <div className={`notification ${messageType}`}>
      { Array.isArray(message)
        ? <MessageList messages={ message } />
        : message }
    </div>
  ) : null
}

export default Notification
