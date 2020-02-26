/** import { stringify } from 'qs'; */
import * as http from 'apis';

/** 获取天气 */
export async function GETTEST(params) {
  return http.get('/application-agent/agent/online',params)
}