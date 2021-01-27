  
import React from 'react'
import { useField, useResource } from './hooks'



const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    const returnedNote = await noteService.create({ content: content.value })
    noteService.setAll(notes.concat(returnedNote))
    content.onReset()
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    const returnedPerson = await personService.create({ name: name.value, number: number.value})
    personService.setAll(persons.concat(returnedPerson))
    name.onReset()
    number.onReset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <div key={n.id}>{n.name} {n.number}</div>)}
    </div>
  )
}

export default App