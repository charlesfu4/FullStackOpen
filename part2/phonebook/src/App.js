import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')

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

  const personToShow = persons.filter(person => person.name.includes(newFilter))
  
  const handleNameChange = (event) =>
    setNewName(event.target.value)

  const handleNumChange = (event) =>
    setNewNum(event.target.value)

  const handleFilterChange = (event) =>
    setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with<input onChange={handleFilterChange} />
        </div>

      <h2>Add a new</h2>
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
        {personToShow.map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

export default App