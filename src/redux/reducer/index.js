
/**
 * Reducer 数据处理 
 * 处理业务
 */
import { type } from "../action";
const initallState = {
  menuName: '首页'
}

export default (state = initallState,action) => {
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.menuName
      }
      // break;
    default:
      return state
      // break;
  }
}