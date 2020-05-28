import { SetValue } from './index';

const _timeSort = (a, b) => {
  const _a_time = '0000' + String(a.diff_time).slice(-4);
  const _b_time = '0000' + String(b.diff_time).slice(-4);
  return _a_time - _b_time;
};

const _distanceSort = (a, b) => {
  let _a_distance = '';
  if (a.distance === 0.0) {
    _a_distance = '0000';
  } else {
    _a_distance = ('0000' + a.distance * 10).slice(-4);
  }
  let _b_distance = '';
  if (b.distance === 0.0) {
    _b_distance = '0000';
  } else {
    _b_distance = ('0000' + b.distance * 10).slice(-4);
  }
  const _a_time = ('0000' + String(a.diff_time)).slice(-4);
  const _b_time = ('0000' + String(b.diff_time)).slice(-4);

  return _a_distance === _b_distance
    ? _a_time - _b_time
    : _a_distance - _b_distance;
};

const _reviewSort = (a, b) => {
  const _a_review = ('000' + a.review * 10).slice(-2);
  const _b_review = ('000' + b.review * 10).slice(-2);
  return _a_review === _b_review ? a.title - b.title : _b_review - _a_review;
};

const Sort = (movies, sortID, latlong) => {
  const valuedMovies = SetValue(movies, latlong);
  switch (sortID) {
    case 'time':
      // 時間順でソート
      return valuedMovies.sort(_timeSort);
    case 'distance':
      // 距離順でソート
      return valuedMovies.sort(_distanceSort);
    case 'review':
      // レビューでソート
      return valuedMovies.sort(_reviewSort);
  }
};

export default Sort;
