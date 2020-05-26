import React from 'react';
import { List } from './index';

const Lists = ({ movies }) => {
  return (
    <main id='list'>
      {movies.map((movie, index) => (
        <div className='card' key={index}>
          <List movie={movie} />
        </div>
      ))}
    </main>
  );
};

export default Lists;
