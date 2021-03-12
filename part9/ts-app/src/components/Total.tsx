import React from 'react';
interface course {
  name: string;
  exerciseCount: number;
}

const Total = ({ parts } : { parts: course[]}) => (
  <div>
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </div>
);

export default Total;