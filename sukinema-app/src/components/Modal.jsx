import React from 'react';
import { SetValue, HookValue } from '../helpers/index';

const Modal = ({ movies, latlong, movieID, closeModal }) => {
  const valuedMovies = SetValue(movies, latlong);
  const id = Number(movieID);

  const openLink = (e) => {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = valuedMovies[id].link;
    a.target = '_blank';
    a.click();
  };

  return (
    <React.Fragment>
      <div className='modal js-modal'>
        <div className='modal_inner'>
          <div className='modal_bg js-modal-close' onClick={closeModal}></div>
          <div className='modal_cont'>
            <div className='mo_upper'>
              <p className='mo_img'>
                <img src={valuedMovies[id].poster_path} />
              </p>
              <div className='mo_ttl'>
                <h2 className='strong mo_title f_feature'>
                  {valuedMovies[id].title}
                </h2>
                <p className='mo_date'>{valuedMovies[id].release_date}</p>
                <a
                  href={valuedMovies[id].link}
                  onClick={openLink}
                  className='mo_place f_feature'
                  target='_blank'
                >
                  {valuedMovies[id].theater}
                </a>
                <p className='mo_time'>{valuedMovies[id].all_time}</p>
              </div>
            </div>
            <div className='mo_txt f_feature'>
              {valuedMovies[id].description}
            </div>
            <div className='button_area strong'>
              <a
                href={valuedMovies[id].link}
                onClick={openLink}
                id='mo_link'
                target='_blank'
              >
                映画館公式サイトへ
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
