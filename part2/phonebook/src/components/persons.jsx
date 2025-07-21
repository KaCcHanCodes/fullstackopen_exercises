const Persons = ({showPersons, removeNumber}) => {
  return(
    <div>
      {showPersons.map(person => 
      <div key = {person.id}>
        {person.name} {person.number} <button onClick={
          () => removeNumber(person.id)}>delete</button>
       </div>
      )}
    </div>
  )
}

export default Persons