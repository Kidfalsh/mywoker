/** import { stringify } from 'qs'; */
import * as http from './../../axios/index';

/** 获取天气 */
export async function getWeather(params) {
  return http.get('/weather/city.json?cityName=成都',params)
}
