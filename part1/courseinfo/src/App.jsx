import { useState } from "react"

const Header = (props) => <h1>{props.header}</h1>

const SubHeading = (props) => <h2>{props.subHeading}</h2>

const Button = ({onClick, text}) => 
    <button onClick={onClick}>{text}</button>

const Statisticline = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr> 
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return(
      <div>No feedback given</div>
    )
  }
  return(
    <table> 
      <tbody>
        <Statisticline  text = 'good' value = {props.good} />
        <Statisticline  text = 'neutral' value = {props.neutral} />
        <Statisticline  text = 'bad' value = {props.bad} />
        <Statisticline  text = 'all' value = {props.all} />
        <Statisticline  text = 'average' value = {props.average} />
        <Statisticline  text = 'positive' value = {props.positive} />
      </tbody>  
    </table>
  )
}

const App = () => {
  const header = 'Give a feedback'
  const subHeading = 'Statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
    const updatedAll = all + 1
    setAverage((updatedGood - bad) / updatedAll)
    setPercentage(100/updatedAll*updatedGood)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(updatedNeutral + good + bad)
    const updatedAll = all + 1
    setAverage((good - bad) / updatedAll)
    setPercentage(100/updatedAll*good)
  }
  const handleBadClick = () => {
     const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(updatedBad + good + neutral)
    const updatedAll = all + 1
    setAverage((good - updatedBad) / updatedAll)
    setPercentage(100/updatedAll*good)
  }
  
  return (
    <div>
      <Header header = {header}/>
      <Button onClick = {handleGoodClick} text = 'good'/>
      <Button onClick = {handleNeutralClick} text = 'neutral'/>
      <Button onClick = {handleBadClick} text = 'bad'/>
      <SubHeading subHeading = {subHeading}/>
      <Statistics good = {good} neutral = {neutral}
      bad = {bad} all = {all} average = {average} 
      positive = {percentage + "%"}
      />
    </div>
  )
}

export default App