export default {
  name: 'blur',
  config: {},
  install(Vue) {
    Vue.directive('blur', {
      bind(el) {
        el.addEventListener('blur', function() {
          setTimeout(function() {
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
            window.scrollTo(0, Math.max(scrollHeight - 1, 0))
          }, 100)
        })
      }
    })
  }
}
