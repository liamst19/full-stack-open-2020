import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => {
  return <h1>{props.course}</h1>
}

const Part = props => {
  return <p>{props.name} {props.exercises}</p>
}

const Content = ({ parts }) => {
  return (<div>
            <Part name={parts[0].name} exercises={ parts[0].exercises }/>
            <Part name={parts[1].name} exercises={ parts[1].exercises }/>
            <Part name={parts[2].name} exercises={ parts[2].exercises }/>
          </div>)
}

const Total = props => {
  return <p>Number of exercises { props.exerciseCount }</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React',    exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component',     exercises: 14 }
  ]
  const exerciseCount = parts.reduce((n, p) => n + p.exercises, 0)

  return (<div>
            <Header course={ course }/>
            <Content parts={ parts }/>
            <Total exerciseCount={ exerciseCount }/>
          </div>)
}

ReactDOM.render(<App />, document.getElementById('root'))
