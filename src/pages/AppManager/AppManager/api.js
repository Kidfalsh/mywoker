import * as http from 'apis';
/** 查询审核列表信息  */
export async function getApproveList (params) {
  let url = ''
  if(params.name){
    url = `/store/approval/list/v1.0?page=${params.page}&pageSize=${params.size}&approvalStatus=${params.approvalStatus}&name=${params.name}`
  }else{
    url = `/store/approval/list/v1.0?page=${params.page}&pageSize=${params.size}&approvalStatus=${params.approvalStatus}`
  }
  return http.get(url,params)
}