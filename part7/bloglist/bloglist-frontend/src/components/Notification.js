import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Alert } from 'react-bootstrap'

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
  const alertVariant =
        notification.type ===  'error'
          ? 'danger'
          : notification.type === 'info'
            ? 'success'
            : 'secondary'

  return notification ? (
    <div className={`notification ${notification.type}`}>
      <Alert variant={alertVariant}>
        { Array.isArray(notification.message)
          ? <MessageList messages={ notification.message } />
          : notification.message }
      </Alert>
    </div>
  ) : null
}

export default Notification
