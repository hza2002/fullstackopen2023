import { useState, useEffect } from 'react'
import personService from './services/PersonService'

import Filter from './component/Filter'
import Persons from './component/Persons'
import PersonForm from './component/PersonForm'
import Notification from './component/Notification'

const App = () => {
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(returnedPersons => {
        console.log('promise fulfilled')
        setPersons(returnedPersons)
        console.log('render', returnedPersons.length, 'notes')
      })
  }, [])

  const personsFormProps = {
    persons,
    setPersons,
    setErrorMessage,
    setSuccess
  }

  const personsProps = {
    persons,
    setPersons,
    filter,
    setErrorMessage,
    setSuccess
  }

  return (
    <div>
      <Notification message={errorMessage} success={success} />
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm {...personsFormProps} />
      <h3>Numbers</h3>
      <Persons {...personsProps} />
    </div>
  )
}

export default App
