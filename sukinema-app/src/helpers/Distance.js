const GetDistance = (lat1, lng1, lat2, lng2) => {
  var location_array = [lat1, lng1, lat2, lng2];
  lat1 *= Math.PI / 180;
  lng1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  lng2 *= Math.PI / 180;

  if (
    location_array.indexOf(0) >= 0 ||
    location_array.indexOf(undefined) >= 0 ||
    location_array.indexOf(null) >= 0
  ) {
    return 0.0;
  }
  var distance =
    6371 *
    Math.acos(
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
        Math.sin(lat1) * Math.sin(lat2)
    );
  return distance.toFixed(1);
};

export default GetDistance;
