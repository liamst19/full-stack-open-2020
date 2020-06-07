import React from 'react';
import { CoursePart, assertNever } from '../types';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <ul>
      { courseParts.map(part => {
          switch(part.name) {
            case "Fundamentals":
              return <li key={part.name}>{part.name} {part.description} {part.exerciseCount}</li>;
            case "Using props to pass data":
              return <li key={part.name}>{part.name} {part.groupProjectCount} {part.exerciseCount}</li>;
            case "Deeper type usage":
              return <li key={part.name}>{part.name} {part.exerciseSubmissionLink} {part.description} {part.exerciseCount}</li>;
            case "Exercise 9.15 CoursePart":
              return <li key={part.name}>{part.name} {part.description} {part.exerciseCount}</li>;
            default:
              return assertNever(part);
          }
      }
      )}
    </ul>
  );
};

export default Content;
