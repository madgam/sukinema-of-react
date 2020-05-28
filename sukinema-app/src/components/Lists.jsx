import React from 'react';
import { List } from './index';

const Lists = ({ movies, openModal, initmovieID }) => {
  return (
    <main id='list'>
      {movies.map((movie, index) => (
        <div className='card' key={index}>
          <List movie={movie} openModal={openModal} initmovieID={initmovieID} />
        </div>
      ))}
    </main>
  );
};

export default Lists;
