import noimageDrop from '../assets/img/noimages.png';
import noimagePos from '../assets/img/no_images_po.jpg';
import { GetDistance } from './index';

const replaceAll = (str, beforeStr, afterStr) => {
  const reg = new RegExp(beforeStr, 'g');
  return str.replace(reg, afterStr);
};

const getDiff = (startTime) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const startTimeArray = startTime.split(':');

  let startYear = 0;
  let startMonth = 0;
  let startDate = 0;
  let startHours = 0;
  let startMinutes = 0;
  if (Number(startTimeArray[0]) > 23) {
  } else {
    startYear = year;
    startMonth = month;
    startDate = date;
    startHours = Number(startTimeArray[0]);
    startMinutes = Number(startTimeArray[1]);
  }
  const start = new Date(
    startYear,
    startMonth - 1,
    startDate,
    startHours,
    startMinutes
  );
  const diff = start.getTime() - now.getTime();

  //HH部分取得
  let diffHour = diff / (1000 * 60 * 60);
  //MM部分取得
  let diffMinute = (diffHour - Math.floor(diffHour)) * 60;
  //SS部分取得
  let diffSecond = (diffMinute - Math.floor(diffMinute)) * 60;

  return Math.floor(diffHour) > 0
    ? Math.floor(diffHour) * 60 + Math.floor(diffMinute)
    : Math.floor(diffMinute);
};

const SetValue = (movies, latlong) => {
  let cleanserdMovies = [];
  let count = 0;
  const currnetLatitude = latlong.latitude;
  const currnetLongitude = latlong.longitude;
  movies.forEach((e) => {
    const diffTime = getDiff(e.time);
    if (diffTime < 0) {
      return;
    } else if (diffTime < 10 || diffTime >= 120) {
      return;
    }
    let movie = {};
    movie.index = ('000' + count).slice(-3);
    const distance = GetDistance(
      currnetLatitude,
      currnetLongitude,
      e.latitude,
      e.longitude
    );
    movie.distance = distance;
    movie.latitude = e.latitude;
    movie.longitude = e.longitude;
    const ratingNum = e.review;
    const _ratingNum = +'000' + String(ratingNum * 10 - ((ratingNum * 10) % 5));
    movie.ratingClass = 'rating rating_' + _ratingNum.slice(-2);
    movie.diff_time = diffTime;
    let drop_path = e.drop_path;
    if (drop_path) {
      movie.drop_path = `https://image.tmdb.org/t/p/w1000_and_h563_face${drop_path}`;
    } else {
      movie.drop_path = noimageDrop;
    }
    let poster_path = e.poster_path;
    if (poster_path) {
      movie.poster_path = `https://image.tmdb.org/t/p/w300_and_h450_face${poster_path}`;
    } else {
      movie.poster_path = noimagePos;
    }

    movie.title = e.title;
    movie.theater = e.theater;
    movie.description = e.description;
    movie.link = e.link;
    movie.release_date = e.release_date;
    movie.review = e.review;
    movie.time = e.time;
    movie.all_time = replaceAll(e.all_time, ',', ' / ');

    cleanserdMovies.push(movie);
    count++;
  });
  return cleanserdMovies;
};

export default SetValue;
