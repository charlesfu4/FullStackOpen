import axios from 'axios'
import React,{useEffect, useState} from 'react'
import CountryToShow from './components/CountryToShow'
import Filter from './components/Filter'

const App = () => {
  const [countries, SetCounties] = useState([])
  const [newFilter, SetNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        console.log('effect')
        SetCounties(response.data)
      })
  },[])

  const countryList = countries.filter(country =>
     country.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  console.log(countryList)


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    SetNewFilter(event.target.value)
  }



  return(
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <CountryToShow countryList={countryList} setFilter={SetNewFilter} />
    </div>
  )

}

export default App