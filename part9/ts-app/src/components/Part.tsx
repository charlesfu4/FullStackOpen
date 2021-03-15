import React from 'react';
import { CoursePart } from '../types';


/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ parts } : { parts: CoursePart[] }) => (
  <div>
    {parts.map(part => {
      switch (part.type) {
        case "normal":
          return(
          <div key={part.name}>
            <h2>{part.name} {part.exerciseCount}</h2>
            <p>{part.description}</p>
          </div>
          );
        case "groupProject":
          return(
            <div key={part.name}>
              <h2>{part.name} {part.exerciseCount}</h2>
              <p>{`project exercises ${part.groupProjectCount}`}</p>
            </div>
          );
        case "submission":
          return(
            <div key={part.name}>
              <h2>{part.name} {part.exerciseCount}</h2>
              <p>{part.description}</p>
              <p>{part.exerciseSubmissionLink}</p>
            </div>
          );
        case "special":
          return(
            <div key={part.name}>
              <h2>{part.name} {part.exerciseCount}</h2>
              <p>{part.description}</p>
              <p>{`required skills: ${part.requirements}`}</p>
            </div>
          )
        default:
          return assertNever(part);
      }
    })
    }
  </div>
);

export default Part;