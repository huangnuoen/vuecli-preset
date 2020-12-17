/* 定义全局变量 */
import {
  ENV,
  ENV_URL_PREFIX
} from './env'
global.ENV = ENV
if (process.env.NODE_ENV === 'development') {
  global.baseUrl = '/proxy_api/'
  global.tijianApi = '/tijian_api/'
} else {
  global.baseUrl = location.href.split('health')[0]
  global.tijianApi = ENV_URL_PREFIX.tijian
}
global.health = ENV_URL_PREFIX.api
global.pathname = 'api/frontend/'
