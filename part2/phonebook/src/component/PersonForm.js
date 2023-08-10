import { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()

    // check exist person
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
    }

    console.log('button clicked', event.target)
  }

  const handleInputChange = (event, setStateAction) => setStateAction(event.target.value)
  return (
    <form onSubmit={addName}>
      <div>name: <input onChange={event => handleInputChange(event, setNewName)} /></div>
      <div>number: <input onChange={event => handleInputChange(event, setNewNumber)} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm 
