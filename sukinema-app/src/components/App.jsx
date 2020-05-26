import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Lists } from '../components/index';
import { Sort } from '../helpers/index';
import Geocode from 'react-geocode';
import { PREF } from '../consructors/index';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latlong, setLatLong] = useState({ latitude: '-', longitude: '-' });
  const [pref, setPref] = useState('13');
  const [isLocation, setIsLocation] = useState(false);
  const [sortID, setSortID] = useState('time');
  const [url, setUrl] = useState(
    'https://sukinema.herokuapp.com/api/v1/movies'
  );

  if (!navigator.geolocation) {
    // 現在位置を取得できない場合の処理
    alert('あなたの端末では、現在位置を取得できません。');
  }

  const getCurrentLocation = () => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.setLanguage('ja');
    Geocode.setRegion('jp');
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatLong({ latitude, longitude });
        setIsLocation(true);
        Geocode.fromLatLng(latitude, longitude).then(
          (response) => {
            const fullAddress = response.results[0].formatted_address;
            const address = fullAddress.split(' ')[1];
            Object.keys(PREF).forEach((p) => {
              if (address.indexOf(p) != -1) {
                setPref(PREF[p]);
                setUrl(url + `/pref/${pref}`);
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
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    console.log(url);
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
      setMovies(retMovies[0]);
      setIsLoading(false);
    };
    f();
  }, [url]);

  return (
    <React.Fragment>
      <Header
        movies={movies}
        setMovies={setMovies}
        setIsLoading={setIsLoading}
        latlong={latlong}
        setSortID={setSortID}
      />
      <Lists movies={Sort(movies, sortID, latlong)} />
    </React.Fragment>
  );
};

export default App;
