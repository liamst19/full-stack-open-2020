import React, { useState, useEffect } from 'react'

const Notification = ({ notification, setNotification }) => {
  return (
    <div className="notification">{ notification }</div>
  )
}

export default Notification
