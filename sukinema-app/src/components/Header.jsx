import React, { useState } from 'react';
import logo from '../assets/img/logo.svg';

const TIME_ID = 'time';
const DISTANCE_ID = 'distance';
const REVIEW_ID = 'review';

const Header = ({
  setIsLoading,
  setSortID,
  prefChange,
  prefOption,
  currentPref,
}) => {
  const [sortFlg, setSortFlg] = useState({
    [TIME_ID]: true,
    [DISTANCE_ID]: false,
    [REVIEW_ID]: false,
  });
  const linkHandler = (e) => {
    e.preventDefault();
    setSortFlg({ [e.target.id]: true });
    setSortID(e.target.id);
  };

  return (
    <React.Fragment>
      <header>
        <div style={{ display: 'flex' }}>
          <h1 className='logo'>
            <span>
              <img src={logo} alt='スキネマ' />
            </span>
            <span>
              <select value={currentPref} onChange={prefChange}>
                {prefOption}
              </select>
            </span>
          </h1>
        </div>
      </header>
      <nav>
        <div className='nav_inner'>
          <ul className='sort_nav'>
            <li
              id={TIME_ID}
              className={sortFlg[TIME_ID] ? 'sort_link_on' : 'sort_link'}
              onClick={linkHandler}
            >
              上映時間順
            </li>
            <li
              id={DISTANCE_ID}
              className={sortFlg[DISTANCE_ID] ? 'sort_link_on' : 'sort_link'}
              onClick={linkHandler}
            >
              距離順
            </li>
            <li
              id={REVIEW_ID}
              className={sortFlg[REVIEW_ID] ? 'sort_link_on' : 'sort_link'}
              onClick={linkHandler}
            >
              人気順
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
