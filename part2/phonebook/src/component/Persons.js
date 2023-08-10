const Persons = ({ persons, filter }) => {
  const personsToShow = persons.filter(person => person.name.includes(filter))
  return (personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>))
}
export default Persons
