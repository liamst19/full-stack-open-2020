import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { good, neutral, bad, reset } from './reducer.js'

const App = ({ getState }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  return (
    <div>
      <button onClick={() => good(dispatch)}>good</button>
      <button onClick={() => neutral(dispatch)}>neutral</button>
      <button onClick={() => bad(dispatch)}>bad</button>
      <button onClick={() => reset(dispatch)}>reset stats</button>
      <div>good {state.good}</div>
      <div>neutral {state.ok}</div>
      <div>bad{state.bad}</div>
    </div>
  )
}

export default App
