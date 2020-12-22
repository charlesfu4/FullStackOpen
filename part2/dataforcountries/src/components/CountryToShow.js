import React from 'react'
import CountryList from './CountryList'
import Country from './Country'

const CountryToShow = ({countryList, setFilter, apikey}) => {
    const len = countryList.length

    if(len >10)
      return(<div>Too many matches, specify another filter.</div>)
    else if(len <=10 && len >1){
      return(<div>
        {countryList.map(country =>
        <CountryList key={country.name} name={country.name} setFilter={setFilter} />
        )}
      </div>
      )
    }
    else if(len === 1){
       const single = countryList[0]
      return(<div>
        {<Country name={single.name} capital={single.capital}
        pop={single.population} languages={single.languages} url={single.flag}
        apikey={apikey} />}
        </div>
      )
    }
    else
      return(<div>No result matches.</div>)
} 

export default CountryToShow