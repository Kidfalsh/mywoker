/**
 * Action 类型
 */
export const type = {
  SWITCH_MENU: 'SWITCH_MENU', /** 菜单显示栏 */
  HEAD_BREADCRUMB: 'HEAD_BREADCRUMB', /**头部导航栏 */
}

export function switchMenu(menuName) {
  return {
    type: type.SWITCH_MENU,
    menuName
  }
}
/**切换头部导航栏 */
export function switchBreadcrum(HeadBreadcrumb) {
  return {
    type: type.HEAD_BREADCRUMB,
    HeadBreadcrumb
  }
}