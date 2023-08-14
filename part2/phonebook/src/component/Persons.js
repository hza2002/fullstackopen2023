import personService from '../services/PersonService'


const Persons = ({ persons, setPersons, filter }) => {
  const personsToShow = persons.filter(person => person.name.includes(filter))
  return (personsToShow.map(person => {
    const deletePerson = (event) => {
      event.preventDefault()
      window.confirm(`Delete ${person.name}?`)

      personService.deletePerson(person.id)
        .then(response => {
          console.log('Delete successful:', response)
          personService.getAll().then(returnedPersons => {
            setPersons(returnedPersons)
          })
        })
        .catch(error => console.error('Delete failed:', error))
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
