import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [data, setData] = useState(null)
  const [found, setFound] = useState(false)

  useEffect(() => {
    axios
    .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
    .then(response => {
      setData(response.data[0])
      if(response.data !== null)
        setFound(true)
    })
  },[name])

  return {
    data,
    found
  }
}