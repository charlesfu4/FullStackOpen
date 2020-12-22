import react from 'react'
import Language from './Language'

const Country = ({name, capital, pop, languages, url}) =>{
  return (
    <div>
        <h1>{name}</h1>
        <div>{capital}</div>
        <div>{pop}</div>
        <h2>Languages</h2>
        <ul>
          {languages.map(language =>
            <Language key={language.id} name={language.name}/>
          )}
        </ul>
        <img width="110" height="110" src={url}></img>
    </div>
  )
}

export default Country