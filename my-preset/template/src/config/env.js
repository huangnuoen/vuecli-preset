const config = {
  dev: {
    api: 'dev.xxx.com'
  },
  test: {
    api: 'test.xxx.com'
  },
  prod: {
    api: 'prod.xxx.com'
  }
}

function getEnv() {
  let ENV = 'dev'
  // 区分3个环境,判断要根据实际项目地址区分
  const baseUrl = location.href
  if (/dev\./.test(baseUrl)) {
    ENV = 'dev'
  } else if (/test\./.test(baseUrl)) {
    ENV = 'test'
  } else if (/prod\./.test(baseUrl)) {
    ENV = 'prod'
  }
  return ENV
}
export const ENV = getEnv()
export const ENV_URL_PREFIX = config[ENV]
