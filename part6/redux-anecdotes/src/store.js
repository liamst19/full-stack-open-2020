import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
// import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notes: anecdoteReducer,
//  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools())

export default store
