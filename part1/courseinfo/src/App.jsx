const Header = (props) => {
  console.log(props)

  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)

  return(
    <div>{props.name} {props.exercise}</div>
  )
}


const Content = (props) => {
  return(
    <div>
      <Part name={props.part1} exercise={props.exercise1}/>
      <Part name={props.part2} exercise={props.exercise2}/>
      <Part name={props.part3} exercise={props.exercise3}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)

  return(
    <p> Number of exercises {props.sum}</p>
  )
}

const App = () => {
  const course = "Half stack application development"
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = "Using props to pass data"
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14
  const sum = exercise1 + exercise2 + exercise3

  return (
    <div>
      <Header course= {course}/>
      <Content 
      part1= {part1} exercise1={exercise1}
      part2= {part2} exercise2={exercise2}
      part3= {part3} exercise3={exercise3}
      />
      <Total sum={sum}/>
    </div>
  )
}

export default App