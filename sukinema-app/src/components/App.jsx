import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Lists, Modal } from '../components/index';
import { Sort } from '../helpers/index';
import Geocode from 'react-geocode';
import { PREF } from '../consructors/index';
import title from '../assets/img/ttl.svg';

const BASE_URL = 'https://sukinema.herokuapp.com/api/v1/movies';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latlong, setLatLong] = useState({ latitude: 0.0, longitude: 0.0 });
  const [pref, setPref] = useState('');
  const [isLocation, setIsLocation] = useState(false);
  const [sortID, setSortID] = useState('time');
  const [url, setUrl] = useState(BASE_URL);
  const [modalShow, setModalShow] = useState(false);
  const [movieID, setMovieID] = useState('');

  if (!navigator.geolocation) {
    // 現在位置を取得できない場合の処理
    alert('あなたの端末では、現在位置を取得できません。');
  }

  const openModal = () => {
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  const initmovieID = (movieID) => {
    setMovieID(movieID);
  };

  const getCurrentLocation = () => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.setLanguage('ja');
    Geocode.setRegion('jp');
    setIsLoading(true);
    setIsLocation(false);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatLong({ latitude, longitude });
        Geocode.fromLatLng(latitude, longitude).then(
          (response) => {
            const fullAddress = response.results[0].formatted_address;
            const address = fullAddress.split(' ')[1];
            PREF.forEach((p) => {
              if (address.indexOf(p.name) != -1) {
                setPref(p.id);
                setUrl(url + `/pref/${p.id}`);
                setIsLocation(true);
              }
            });
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        // エラー番号に対応したメッセージ
        const errorInfo = [
          '原因不明のエラーが発生しました…。',
          '位置情報の取得が許可されませんでした…。',
          '電波状況などで位置情報が取得できませんでした…。',
          '位置情報の取得に時間がかかり過ぎてタイムアウトしました…。',
        ];
        const errorNo = error.code;
        const errorMessage =
          '[エラー番号: ' + errorNo + ']\n' + errorInfo[errorNo];
        alert(errorMessage);
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let retMovies = [];
    const f = async () => {
      await axios
        .get(url)
        .then((results) => {
          retMovies.push(results.data);
        })
        .catch((e) => {
          console.log(e);
        });
      const data = await retMovies[0];
      setMovies(data);
      setIsLoading(false);
    };
    f();
  }, [url]);

  const options = PREF.map((p) => (
    <option key={p.id} value={p.id}>
      {p.name}
    </option>
  ));

  const prefChange = (e) => {
    const newPrefID = e.target.value;
    setPref(newPrefID);
    if (newPrefID) {
      setUrl(BASE_URL + `/pref/${newPrefID}`);
    } else {
      setUrl(BASE_URL);
    }
  };

  return (
    <React.Fragment>
      {(() => {
        if (modalShow && movieID) {
          return (
            <Modal
              movies={movies}
              latlong={latlong}
              movieID={movieID}
              closeModal={closeModal}
            />
          );
        }
      })()}
      <Header
        movies={movies}
        setMovies={setMovies}
        setIsLoading={setIsLoading}
        latlong={latlong}
        setSortID={setSortID}
        prefChange={prefChange}
        prefOption={options}
        currentPref={pref}
      />
      {(() => {
        if (isLoading || !isLocation) {
          // return <div>...loading</div>;
          return (
            <div id='loader'>
              <p className='title'>
                <img src={title} alt='スキネマ　スキマ時間で映画を観よう' />
              </p>
              <span>Loading...</span>
            </div>
          );
        } else {
          const valuedMovies = Sort(movies, sortID, latlong);
          if (valuedMovies.length > 0) {
            return (
              <Lists
                movies={valuedMovies}
                openModal={openModal}
                initmovieID={initmovieID}
              />
            );
          } else {
            return <div>現在 映画が公開されていません</div>;
          }
        }
      })()}
    </React.Fragment>
  );
};

export default App;
