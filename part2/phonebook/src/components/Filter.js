import React from 'react'

const Filter = (filter) =>(
  <div>
    filter shown with <input onChange={filter.handleFilterChange} />
  </div>
) 

export default Filter