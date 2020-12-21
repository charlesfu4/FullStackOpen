import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567' 
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNum ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName))
      alert(`${newName} is already added to phonebook`)
    else{
      const personObj = {
        id: persons.length+1,
        name: newName,
        date: new Date().toISOString(),
        number: newNumber
      }

      setPersons(persons.concat(personObj))
    }
    setNewName('')
    setNewNum('')
  }
  
  const handleNameChange = (event) =>
    setNewName(event.target.value)

  const handleNumChange = (event) =>
    setNewNum(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

export default App