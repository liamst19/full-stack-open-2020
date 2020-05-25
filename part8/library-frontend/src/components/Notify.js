import React from 'react'

const Notify = ({message}) => {

  const style = {
    display: message ? 'block' : 'none',
    color: 'red',
    border: message ? '1px solid red' : 'none',
    backgroundColor: '#EEE',
    padding: '0.5em',
    margin: '0.25rem, 0'
  }
  console.log(message)

  return (<div style={style} >{message}</div>)
}

export default Notify
