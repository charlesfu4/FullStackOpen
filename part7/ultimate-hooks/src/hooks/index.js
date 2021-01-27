import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = (e) => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset,
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  },[baseUrl])

  const setAll = (newResources) => setResources(newResources) 
  
  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  }

  const update = async (id, newObject) => {
    const request = await axios.put(`${ baseUrl } /${id}`, newObject)
    return request.data
  }

  const service = {
    setAll,
    create,
    update,
  }

  return [
    resources, service
  ]
}