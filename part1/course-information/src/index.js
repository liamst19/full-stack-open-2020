import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => {
  return <h1>{props.course}</h1>
}
const Content = props => {
  return (<div>
            <p>
              {props.parts[0].title} {props.parts[0].exercises}
            </p>
            <p>
              {props.parts[1].title} {props.parts[1].exercises}
            </p>
            <p>
              {props.parts[2].title} {props.parts[2].exercises}
            </p>
          </div>)
}
const Total = props => {
  return <p>Number of exercises { props.exerciseCount }</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { title: 'Fundamentals of React',    exercises: 10 },
    { title: 'Using props to pass data', exercises: 7 },
    { title: 'State of a component',     exercises: 14 }
  ]
  const exerciseCount = parts.reduce((n, p) => n + p.exercises, 0)

  return (<div>
            <Header course={ course }/>
            <Content parts={ parts }/>
            <Total exerciseCount={ exerciseCount }/>
          </div>)
}

ReactDOM.render(<App />, document.getElementById('root'))
