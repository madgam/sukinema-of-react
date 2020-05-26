import React from 'react';

const List = ({ movie }) => {
  return (
    <React.Fragment>
      <a className='link js-modal-open' id={movie.index} href='#'></a>
      <div className='image_content'>
        <div className='place'>
          <span>{movie.distance}</span>
          <span>
            <small>km</small>
          </span>
        </div>
        <div className={movie.ratingClass}>
          <div className='rating_num'>{movie.review}</div>
          <div className='rating_star'></div>
        </div>
        <div className='img_box'>
          <img src={movie.drop_path} />
        </div>
      </div>
      <div className='content'>
        <div className='left_text'>
          <span>上映まで</span>
          <div className='strong time'>{movie.diff_time}分</div>
        </div>
      </div>
      <div className='right_text'>{movie.title}</div>
    </React.Fragment>
  );
};

export default List;
