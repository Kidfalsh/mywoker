/** import { stringify } from 'qs'; */
import * as http from 'apis';

/** 测试接口 */
export async function GETTEST(params) {
  return http.get('/application-agent/agent/online',params)
}
/** 查询标签列表 */
/** 发布应用 */
export async function buildApps(params) {
  return http.post('/client-manager/api/dataService/createApplication',params)
}