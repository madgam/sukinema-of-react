import React from 'react';
import logo from '../assets/img/logo.svg';
import title from '../assets/img/ttl.svg';

const Header = ({ setIsLoading, setSortID }) => {
  const handler = (e) => {
    e.preventDefault();
  };

  const linkHandler = (e) => {
    e.preventDefault();
    const f = async () => {
      setIsLoading(true);
      setSortID(e.target.id);
    };
    f();
  };

  return (
    <React.Fragment>
      <div id='loader'>
        <p className='title'>
          <img src={title} alt='スキネマ　スキマ時間で映画を観よう' />
        </p>
      </div>

      <header>
        <h1 className='logo'>
          <span onClick={handler}>
            <img src={logo} alt='スキネマ' />
          </span>
        </h1>
      </header>
      <nav>
        <div className='nav_inner'>
          <ul className='sort_nav'>
            <li id='time' className='sort_link' onClick={linkHandler}>
              上映時間順
            </li>
            <li id='distance' className='off sort_link' onClick={linkHandler}>
              距離順
            </li>
            <li id='review' className='off sort_link' onClick={linkHandler}>
              人気順
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
