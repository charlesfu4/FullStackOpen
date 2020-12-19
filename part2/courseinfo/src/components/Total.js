import React from 'react'

const Total = ({course}) => ( 
  <b>Total of exercises {
    course.parts.reduce((add, part) => {
      return add + part.exercises 
    },0)
  }</b>
)
export default Total