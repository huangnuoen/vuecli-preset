/* 接口在module中维护 */
import http from '../config'
const user = {
  user_info_v2() {
    return http({
      url: 'user/user_info_v2'
    })
  }
}
export default user
