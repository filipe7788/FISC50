import GeoJSON from 'geojson';
import jsonData from '../assets/countries.geojson';

const json = jsonData;

const data = GeoJSON.parse(json, {
  Point: ['latitude', 'longitude'],
});

export default data;