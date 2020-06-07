import React from 'react';
import { CoursePart } from '../types';

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <ul>
      { courseParts.map(part => (
        <li key={part.name}>
          {part.name} {part.exerciseCount}
        </li>
        ))}
    </ul>
  );
};

export default Content;
