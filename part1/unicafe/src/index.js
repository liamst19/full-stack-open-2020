import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  return (<tr><td>{props.text}</td><td>{props.value}</td></tr>);
}

const Statistics = (props) => {

  const good     = props.good;
  const neutral  = props.neutral;
  const bad      = props.bad;
  const all      = good + neutral + bad;
  const average  = (good - bad) / all;
  const positive = 100 * good / all;

  if(all > 0){
    return (
      <table>
        <tbody>
          <Statistic text="good"     value={ good } />
          <Statistic text="neutral"  value={ neutral } />
          <Statistic text="bad"      value={ bad } />
          <Statistic text="all"      value={ all } />
          <Statistic text="average"  value={ average } />
          <Statistic text="positive" value={ positive + '%' } />
        </tbody>
      </table>
    );
  }
  else{
    return (<div>No feedback given</div>);
  }
}

const Button = (props) => {
  const increment = (count, setCount) => {
    setCount(count + 1);
  };

  return (<button onClick={()=>{increment(props.count, props.setCount)}}>{props.text}</button>);
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button
          text="good"
          count={good}
          setCount={setGood} />
        <Button text="neutral"
                count={neutral}
                setCount={setNeutral} />
        <Button text="bad"
                count={bad}
                setCount={setBad} />
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
