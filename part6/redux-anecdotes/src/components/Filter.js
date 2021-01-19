import React from 'react'
import { useDispatch } from 'react-redux'
import { defineFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  return(
    <div>
      <form>
        filter
        <input onChange={({target}) => dispatch(defineFilter(target.value))}/>
      </form>
    </div>
  )
}

export default Filter