/** import { stringify } from 'qs'; */
import * as http from './../../axios/index';

/** 获取应用列表信息 */
export async function getAppList(params) {
  return http.get('/store/application/app/list/info/v1.0',params)
}
