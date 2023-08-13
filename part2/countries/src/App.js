import Filter from './component/Filter'
import Countries from './component/Countries'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    }

    const promise = axios.get('https://restcountries.com/v3.1/all')
    promise.then(eventHandler)
  }, [])

  console.log('render', countries.length, 'notes')
  console.log('countries', countries)

  return (
    <div>
      <Filter setFilter={setFilter} />
      <Countries countries={countries} filter={filter} />
    </div>
  )
}

export default App
