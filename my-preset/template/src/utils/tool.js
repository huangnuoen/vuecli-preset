import router from '@/router'
/* eslint-disable */
// 判断是安卓还是水果
export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) ? true : false
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false
  },
  Phone: function () {
    return navigator.userAgent.match(/Mobile/i) ? true : false
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.Windows() || isMobile.Phone()
  }
}
export function isWeChat() {
  let ua = window.navigator.userAgent.toLowerCase()
  /* eslint-disable */
  return ua.match(/MicroMessenger/i) == 'micromessenger'
  /* eslint-disable */
}
const SECOND = 1
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
/**
 *
 * @param {时间} time 传入剩余秒数时间
 * @returns {解析好的时间对象} {天，小时，分，秒}
 */
export function parseTimeData(time) {
  let days = Math.floor(time / DAY)
  let hours = Math.floor((time % DAY) / HOUR)
  let mins = Math.floor((time % HOUR) / MINUTE)
  let seconds = time % MINUTE
  return {
    days,
    hours,
    mins,
    seconds
  }
}
// 当请求过程小于delay时，会继续loading,直到delay结束
export function waitLoading(http, delay = 1000) {
  const countdown = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
  return Promise.all([http, countdown]).then((res) => {
    return Promise.resolve(res[0])
  })
}

// 提取特殊url指定参数 类似 http://localhost:8080?a=1/#/home?b=2
export function getUrlSpecifiedParam(paraName) {
  let url = document.location.toString()
  let replace = url.match(/#(\S*)\?/) // 获取#到？之间的一个数组
  replace && (url = url.replace(`#${replace[1]}?`, '?')) // 把url#后面的name值去掉，保留？后面的参数

  let arrObj = url.split('?')
  if (arrObj.length >= 3) {
    url = ''
    for (let i = 0, len = arrObj.length; i < len; i++) {
      url += i === 0 ? arrObj[0] + '?' : '&' + arrObj[i]
    }
    arrObj = url.split('?')
  }
  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split(/[&#]/)
    let arr
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}

// 动态拼接浏览器前缀
export function prefixStyle(style) {
  let elementStyle = document.createElement('div').style
  let vandor = (() => {
    let transformNames = {
      webkit: 'webkitTransform',
      Moz: 'MozTransform',
      O: 'OTransform',
      ms: 'msTransform',
      standard: 'transform'
    }
    for (const key in transformNames) {
      if (transformNames.hasOwnProperty(key)) {
        if (elementStyle[transformNames[key]] !== undefined) {
          return key
        }
      }
    }
    return false
  })()
  if (vandor === false) {
    return false
  }
  if (vandor === 'standard') {
    return style
  }
  return vandor + style.charAt(0).toUpperCase() + style.substring(1)
}
// 二维数组删除某项
export function removeInFlatArr(arr, val) {
  const i = arr.indexOf(val)
  if (i > -1) {
    arr.splice(i, 1)
  }
  return arr
}
// 二维对象转成二维数组
export function convertObjectToArray(obj) {
  const arr = []
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const text = obj[key]
      arr.push({
        text,
        value: key
      })
    }
  }
  return arr
}
// 计算年龄
export function computeAge(birthday) {
  if (birthday) {
    const now = new Date().getTime()
    const birth = new Date(birthday).getTime()
    const age = (now - birth) / (365 * 24 * 60 * 60 * 1000)
    return Math.floor(age)
  }
  return ''
}

// 未知链接或外链通用跳转方法
export function jumpLink({
  url = '',
  replace = false
}) {
  if (!url) {
    return
  }
  // 内链
  let hash = url.split(location.origin + location.pathname)[1]
  if (hash) {
    let path = `/${url.split('#/')[1]}`
    if (replace) {
      router.replace(path)
    } else {
      router.push(path)
    }
  } else {
    // 外链
    if (!/http:\/\/|https:\/\/|\/\//.test(url)) {
      url = '//' + url
    }
    url = addQuery(url, 'comefrom=health')

    if (replace) {
      location.replace(url)
    } else {
      location.href = url
    }
  }
}
export function addQuery(url, query) {
  // 跳外链时统一加上query, 只有#时才加
  if (url.indexOf('#') > -1) {
    const reg = /(\#.*\?)(.*)/
    if (url.match(reg)) {
      url += '&' + query
    } else {
      url += '?' + query
    }
  }
  return url
}

/* 解决弹出层滚动穿透
 * 引入该方法并调用，只需调用一次
 * 缓存返回值到变量a
 * 在弹出层需要禁止穿透时传a(true)
 * 恢复传a(false)
 */
export function fixedRollThrough() {
  let bodyEl = document.body
  let top = window.scrollY
  return function (forbidScroll) {
    // 禁止穿透
    if (forbidScroll) {
      top = window.scrollY
      bodyEl.style.position = 'fixed'
      bodyEl.style.top = -top + 'px'
      bodyEl.style.left = '0'
      bodyEl.style.right = '0'
    } else {
      bodyEl.style.position = ''
      bodyEl.style.top = ''
      bodyEl.style.left = ''
      bodyEl.style.right = ''
      window.scrollTo(0, top)
    }
  }
}

// 获取url参数
export function getQueryString(name, url) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var query = url ? url.split('?')[1] : window.location.href.split('?')[1]
  if (!query) {
    return null
  }
  var r = query.match(reg)
  if (r != null) return r[2]
  return null
}

// js动态同步加载外部js文件
export function loadJs(options) {
  var script = document.createElement('script')
  if (script.addEventListener && options.callback) {
    script.addEventListener('load', options.callback, false)
  } else if (script.attachEvent) {
    script.attachEvent('onreadystatechange', function () {
      var target = window.event.srcElement
      if (target.readyState == 'loaded' || target.readyState == 'complete') {
        options.callback && options.callback.call(target)
      }
    })
  }
  if (options.params && Array.isArray(options.params, 'Object')) {
    for (var key in options.params) {
      script[key] = options.params[key]
    }
  }
  script.src = options.url
  document.getElementsByTagName('head')[0].appendChild(script)
}

// 防抖
export function debounce(func, delay = 500) {
  if (!func) return
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
// 节流
export function throttle(fn, delay = 500) {
  let running
  return (...args) => {
    if (running) return
    running = true
    setTimeout(() => {
      running = false
      fn.apply(this, args)
    }, delay)
  }
}
// 取得[min,max]间的随机整体数
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/* 按格式输出日期 */
export function formatDate(fmt, date) {
  var o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  // 年份格式
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      // fmt = fmt.replace(RegExp.$1, o[k])
      // 根据要求补0
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

// 页面平滑的滚到顶部
export function scrollTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollTop)
    window.scrollTo(0, c - c / 8)
  }
}

// 页面粗暴的滚动到底部
export function scrollDown() {
  setTimeout(function () {
    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
  }, 0)
}



// 计算两点之间的距离
export function getFlatternDistance(lat1, lng1, lat2, lng2) {
  if (!lat1 || !lng1 || !lat2 || !lng2) {
    return null
  }
  var radLat1 = (lat1 * Math.PI) / 180.0
  var radLat2 = (lat2 * Math.PI) / 180.0
  var a = radLat1 - radLat2
  var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    )
  s = s * 6378.137
  s = Math.round(s * 10000) / 10000
  return s
}
