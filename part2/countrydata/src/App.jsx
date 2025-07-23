import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [allCountries, setAllCountries] = useState(null)
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')
  useEffect(() => {
         axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      const val = response.data
      console.log(val.name)})
    }
    , [allCountries])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      Find countries <input value = {search} onChange={handleSearchChange}/>
      {/* {allCountries.map(country => <div key = {country}>{country}</div>)} */}
    </div>
  )
}

export default App
