import React from 'react'

const Person = ({person, del}) => {
  return (
  <li>{person.name} {person.number}
   <button onClick={del}>Delete</button>
  </li>
  )
}

export default Person 