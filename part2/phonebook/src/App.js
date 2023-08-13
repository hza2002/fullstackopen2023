import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './component/Filter'
import Persons from './component/Persons'
import PersonForm from './component/PersonForm'

const App = () => {
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }

    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  console.log('render', persons.length, 'notes')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
