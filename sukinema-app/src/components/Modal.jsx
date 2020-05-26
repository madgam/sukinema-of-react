import React from 'react';

const Modal = (props) => {
  const handler = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div className='modal js-modal'>
        <div className='modal_inner'>
          <div className='modal_bg js-modal-close'></div>
          <div className='modal_cont'>
            <div className='mo_upper'>
              <p className='mo_img'>
                <img src={props.img} />
              </p>
              <div className='mo_ttl'>
                <h2 className='strong mo_title f_feature'>{props.title}</h2>
                <p className='mo_date'>{props.date}</p>
                <a
                  href=''
                  onClick={handler}
                  className='mo_place f_feature'
                  target='_blank'
                >
                  {props.link}
                </a>
                <p className='mo_time'>{props.time}</p>
              </div>
            </div>
            <div className='mo_txt f_feature'>{props.desc}</div>
            <div className='button_area strong'>
              <a href='' onClick={handler} id='mo_link' target='_blank'>
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
