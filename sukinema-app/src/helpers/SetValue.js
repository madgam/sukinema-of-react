import noimageDrop from '../assets/img/noimages.png'
import noimagePos from '../assets/img/no_images_po.jpg'
import { GetDistance } from './index'

const replaceAll = (str, beforeStr, afterStr) => {
  const reg = new RegExp(beforeStr, 'g')
  return str.replace(reg, afterStr)
}

const getDiff = (startTime) => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()

  // const midnightTime = '25:00';
  // const startTimeArray = midnightTime.split(':');
  const startTimeArray = startTime.split(':')

  let startYear = 0
  let startMonth = 0
  let startDate = 0
  let startHours = 0
  let startMinutes = 0

  if (Number(startTimeArray[0]) > 23) {
    // 24時以降の時間の処理
  } else {
    startYear = year
    startMonth = month
    startDate = date
    startHours = Number(startTimeArray[0])
    startMinutes = Number(startTimeArray[1])
  }
  const start = new Date(startYear, startMonth - 1, startDate, startHours, startMinutes)
  const diff = start.getTime() - now.getTime()

  //HH部分取得
  let diffHour = diff / (1000 * 60 * 60)
  //MM部分取得
  let diffMinute = (diffHour - Math.floor(diffHour)) * 60

  return Math.floor(diffHour) * 60 + Math.floor(diffMinute)
}

const SetValue = (movies, latlong) => {
  let cleanserdMovies = []
  let count = 0
  const currnetLatitude = latlong.latitude
  const currnetLongitude = latlong.longitude
  movies.forEach((e) => {
    const index = ('000' + count).slice(-3)
    const diffTime = getDiff(e.time)
    if (diffTime < 0) {
      return
    } else if (diffTime < 10 || diffTime > 120) {
      return
    }
    const distance = GetDistance(currnetLatitude, currnetLongitude, e.latitude, e.longitude)
    const _ratingNum = +'000' + String(e.review * 10 - ((e.review * 10) % 5))
    const ratingClass = 'rating rating_' + _ratingNum.slice(-2)
    let drop_path = e.drop_path
    if (drop_path) {
      drop_path = `https://image.tmdb.org/t/p/w1000_and_h563_face${drop_path}`
    } else {
      drop_path = noimageDrop
    }
    let poster_path = e.poster_path
    if (poster_path) {
      poster_path = `https://image.tmdb.org/t/p/w300_and_h450_face${poster_path}`
    } else {
      poster_path = noimagePos
    }
    const release_date = e.release_date ? e.release_date : '-'
    const description = e.description ? e.description : '説明文が取得できませんでした'
    cleanserdMovies.push({
      index: index,
      distance: distance,
      latitude: e.latitude,
      longitude: e.latitude,
      ratingClass: ratingClass,
      diff_time: diffTime,
      drop_path: drop_path,
      poster_path: poster_path,
      title: e.title,
      theater: e.theater,
      description: description,
      link: e.link,
      release_date: release_date,
      review: e.review,
      time: e.time,
      all_time: replaceAll(e.all_time, ',', ' / '),
    })
    count++
  })
  return cleanserdMovies
}

export default SetValue
