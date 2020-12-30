import React, { useState, useEffect} from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [updateMessage, setUpdateMessage] = useState({
    content: '',
    status: true,
  })

  useEffect(()=>{
    console.log('effect')
    personService
    .getAll()
    .then(allPersons => 
      setPersons(allPersons)
    )
  },[newName])

  const personToShow = persons.filter(person => person.name
    .toLowerCase()
    .includes(newFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const repeatedPerson = persons.find(person => person.name === newName)
    if(repeatedPerson !== undefined){
      console.log(`id ${repeatedPerson.id}`)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
        const changedPerson = {
          ...repeatedPerson,
          number: newNumber
        }
        personService
        .update(repeatedPerson.id, changedPerson)
        .then(newPerson => {
          console.log(newPerson)
          setPersons(persons.map(person => person.id !== repeatedPerson.id ?
          person: newPerson))
          console.log(persons)
          const mesg = {
            content: `Updated ${newPerson.name}`,
            status: true 
          } 
          setUpdateMessage(mesg)
        })
        .catch(error => {
          const mesg = {
            content: `The data of ${newName} has been deleted by other users`,
            status: false
          } 
          setUpdateMessage(mesg)
          setPersons(persons.filter(person => person.name !== newName))
        })
      }
    }
    else{
      const personObj = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObj)
        .then(newPerson =>{
          setPersons(persons.concat(newPerson))
          console.log(newPerson)
          const mesg = {
            content: `Added ${newPerson.name}`,
            status: true 
          } 
          setUpdateMessage(mesg)
      })
    }
    setNewName('')
    setNewNum('')
  }
  
  const deletePerson = (id) => {
    const delperson = persons.find(p => p.id === id)
    const filteredPersons = persons.filter(person => person.id !== id)
    if (window.confirm(`Do you really want to delete ${delperson.name}?`)){
      personService
      .del(id)
      .then(() => setPersons(filteredPersons))
      .catch(error => {
        const mesg = {
          content: `Information of ${delperson.name} has been removed from the server.`,
          status: false
        } 
        setUpdateMessage(mesg)
        setPersons(persons.filter(person => person.id !== delperson.id))
      })
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
      <Notification message={updateMessage} />
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