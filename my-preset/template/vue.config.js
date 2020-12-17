const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // indexPath: path.resolve(__dirname, '../../public/health/index.php'),
  // outputDir: path.resolve(__dirname, '../../public/health'),

  devServer: {
    proxy: {
      '/proxy_api/': {
        target: 'http://dev.xxx.com',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy_api/': ''
        }
      },
      '/api2/': {
        target: 'http://dev.yyy.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api2/': ''
        }
      }
    }
  },
  lintOnSave: false,
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
    config.plugins.delete('prefetch')
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        // 需要全局导入的less
        path.resolve(__dirname, 'src/style/variable.less'),
        path.resolve(__dirname, 'src/style/mixin.less')
      ]
    })
}
