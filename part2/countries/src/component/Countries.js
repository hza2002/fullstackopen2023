const Countries = ({ countries, filter }) => {
  const countriesToShow = countries.filter(country => country.name.common.includes(filter))

  if (countriesToShow.length > 10) return (<p>Too many matches, specify another filter.</p>)
  else if (countriesToShow.length === 1) {
    const onlyCountry = countriesToShow[0]
    return (
      <div>
        <h1>{onlyCountry.name.common}</h1>
        <p>capital {onlyCountry.capital}</p>
        <p>area {onlyCountry.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.keys(onlyCountry.languages).map(
            key => <li key={key}>{onlyCountry.languages[key]}</li>
          )
          }
        </ul>
        <img src={onlyCountry.flags.png} alt="Flag of Country" />
      </div>
    )
  }
  else return (countriesToShow.map(country => <p key={country.name.common}>{country.name.common}</p>))
}

export default Countries
