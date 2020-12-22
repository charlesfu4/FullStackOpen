import React from 'react'
import Language from './Language'

const Country = ({name, capital, pop, languages, url}) =>{
  return (
    <div>
        <h1>{name}</h1>
        <div>Capital: {capital}</div>
        <div>Population: {pop}</div>
        <h2>Languages</h2>
        <ul>
          {languages.map(language =>
            <Language key={language.name} name={language.name}/>
          )}
        </ul>
        <img width="15%" height="15%" src={url} alt=""></img>
    </div>
  )
}

export default Country