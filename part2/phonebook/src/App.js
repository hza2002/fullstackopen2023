import { useState, useEffect } from 'react'
import personService from './services/PersonService'

import Filter from './component/Filter'
import Persons from './component/Persons'
import PersonForm from './component/PersonForm'

const App = () => {
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(returnedPersons => {
        console.log('promise fulfilled')
        setPersons(returnedPersons)
        console.log('render', returnedPersons.length, 'notes')
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  )
}

export default App
