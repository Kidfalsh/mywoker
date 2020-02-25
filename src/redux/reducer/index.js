
/**
 * Reducer 数据处理 
 * 处理业务
 */
import { type } from "../action";
const initallState = {
  menuName: '首页', /**菜单显示栏 */
  HeadBreadcrumb: '', /**头部面包屑导航栏 */
}

export default (state = initallState,action) => {
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      }
    case type.HEAD_BREADCRUMB:
        return {
          ...state,
          HeadBreadcrumb:action.HeadBreadcrumb
        }  
    default:
      return state
  }
}