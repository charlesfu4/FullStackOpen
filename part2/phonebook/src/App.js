import React, { useState, useEffect} from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    console.log('effect')
    personService
    .getAll()
    .then(allPersons => 
      setPersons(allPersons)
    )
  },[])

  const personToShow = persons.filter(person => person.name
    .toLowerCase()
    .includes(newFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName))
      alert(`${newName} is already added to phonebook`)
    else{
      const personObj = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObj)
        .then(newPerson =>{
          setPersons(persons.concat(newPerson))
      })
    }
    setNewName('')
    setNewNum('')
  }
  
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const filteredPersons = persons.filter(person => person.id !== id)
    if (window.confirm(`Do you really want to delete ${person.name}?`)){
      personService
      .del(id)
      .then(() => setPersons(filteredPersons))
    }
  }
  
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
        {personToShow.map((person, i) =>
          <Person key={i} person={person} 
          del={() => deletePerson(person.id)} />
        )}
      </div>
    </div>
  )
}

export default App