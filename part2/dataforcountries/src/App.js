import axios from 'axios'
import React,{useEffect, useState} from 'react'
import Country from './components/Country'
import CountryList from './components/CountryList'
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

  const countryToShow = (countryList) => {
    console.log('toshow')
    const len = countryList.length
    if(len >10)
      return(<div>Too many matches, specify another filter.</div>)
    else if(len <=10 && len >1)
      return(countryList.map(country =>
        <CountryList key={country.id} name={country.name}/>))
    else if(len === 1){
      const single = countryList[0]
      return(<Country name={single.name} capital={single.capital}
         pop={single.population} languages={single.languages} url={single.flag}/>)
    }
    else
      return(<div>No result matches.</div>)
  } 

  console.log(countryToShow(countryList))

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    SetNewFilter(event.target.value)
  }


  return(
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      {countryToShow(countryList)}
    </div>
  )

}

export default App