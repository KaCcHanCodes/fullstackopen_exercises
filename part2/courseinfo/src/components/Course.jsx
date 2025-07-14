const Part = (props) => <p>{props.name} {props.exercises}</p>

const Content = ({parts}) => {
  const total = parts.reduce(
  (accumulator, currentValue) => accumulator + currentValue.exercises,
  0,
  )

  return(
    <div>
      {parts.map(part => 
      <Part key = {part.id} name = {part.name} exercises = {part.exercises}
      />)
      }
      <b>total of {total} exercises</b>
    </div>
  )
}

const Course = ({courses}) => {

  return(
    <div>
      <h3>{courses[0].name}</h3>
      <Content parts = {courses[0].parts} />
      <h3>{courses[1].name}</h3>
      <Content parts = {courses[1].parts} />
    </div>
  )
}

export default Course