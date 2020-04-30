import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => {
  return <h1>{props.course}</h1>
}

const Part = ({ name, exercises }) => {
  return <p>{name} {exercises}</p>
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part name={parts[0].name} exercises={ parts[0].exercises }/>
      <Part name={parts[1].name} exercises={ parts[1].exercises }/>
      <Part name={parts[2].name} exercises={ parts[2].exercises }/>
    </div>
  )
}

const Total = ({ parts })=> {
  const total = parts.reduce((n, p) => n + p.exercises, 0)
  return <p>Number of exercises { total }</p>
}

const Course = ({ course }) => {
  return (<div>
            <Header  course={ course.name }/>
            <Content parts={ course.parts }/>
            <Total   parts={ course.parts }/>
          </div>)
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
