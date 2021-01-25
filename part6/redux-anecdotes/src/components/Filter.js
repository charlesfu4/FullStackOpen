import React from 'react'
import { connect } from 'react-redux'
import { defineFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  return(
    <div>
      <form>
        filter
        <input onChange={({target}) => props.defineFilter(target.value)} />
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  defineFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter