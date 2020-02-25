/** import { stringify } from 'qs'; */
import * as http from './../../axios/index';

/** 获取天气 */
export async function getApplocationTypeList(params) {
  return http.get('/ity.json?cityName=成都',params)
}
export async function getTopten(params) {
  return http.get('/city.json?cityName=成都',params)
}