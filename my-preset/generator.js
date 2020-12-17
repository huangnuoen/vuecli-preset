module.exports = (api, options, rootOptions) => {
  //安装一些基础公共库以及项目内部库
  api.extendPackage({
    dependencies: {
      'style-resources-loader': '^1.3.2',
      vconsole: '^3.3.4',
      qs: '^6.9.4',
      axios: '^0.19.0'
    },
    devDependencies: {
      'postcss-px-to-viewport': '^1.1.1',
      'svg-sprite-loader': '^4.2.1'
    }
  })

  if (options.vuex) {
    api.extendPackage({
      dependencies: {
        vuex: '^3.0.1'
      }
    })
  }

  if (options.vant) {
    api.extendPackage({
      dependencies: {
        vant: '^2.10.4'
      },
      devDependencies: {
        'babel-plugin-import': '^1.13.0'
      }
    })
  }

  //以EJS模板文件的方式生成项目文件
  api.render(
    {
      './src/main.js': './template/src/main.js'
    },
    options
  )
  // 生成默认模板文件
  api.render('./template')
}
