import axios from 'axios'
import React, { useState, useEffect} from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => 
      setPersons(response.data)
    )
  },[])

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
    axios
      .post('http://localhost:3001/persons', personObj)
      .then(response =>{
        setPersons(persons.concat(personObj))
    })
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
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} 
      handleNameChange={handleNameChange} newNumber={newNumber}
      handleNumChange={handleNumChange} />

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