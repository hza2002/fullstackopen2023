const Filter = ({ setFilter }) => {
  const handleFilterChange = (event) => setFilter(event.target.value)
  return (<div>find countries <input onChange={handleFilterChange} /></div>)
}

export default Filter
