import React from 'react'

const Filter = (filter) =>(
  <div>
    find countries <input onChange={filter.handleFilterChange} />
  </div>
)

export default Filter