import React from 'react'

const PersonForm = (pform) => {
  return(
  <form onSubmit={pform.addPerson}>
    <div>
      name: <input value={pform.newName} onChange={pform.handleNameChange} />
    </div>
    <div>
      number: <input value={pform.newNumber} onChange={pform.handleNumChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
   </form>
  )
}

export default PersonForm 