import personService from '../services/PersonService'


const Persons = ({ persons, setPersons, filter, setErrorMessage, setSuccess }) => {
  const personsToShow = persons.filter(person => person.name.includes(filter))
  return (personsToShow.map(person => {
    const deletePerson = (event) => {
      event.preventDefault()
      window.confirm(`Delete ${person.name}?`)

      personService.deletePerson(person.id)
        .then(response => {
          console.log('Delete successful:', response)
          setSuccess(true)
          setErrorMessage(`Delete successful: ${person.name}`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
          personService.getAll().then(returnedPersons => {
            setPersons(returnedPersons)
          })
        })
        .catch(error => {
          console.error('Delete failed:', error)
          setSuccess(false)
          setErrorMessage(`Delete failed: ${person.name}`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
        })
    }

    return (
      <form onSubmit={deletePerson} key={person.name}>
        <p>
          {person.name} {person.number}
          <button type="submit">delete</button>
        </p>
      </form>
    );
  }))
}
export default Persons
