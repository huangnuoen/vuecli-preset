
let plugins = []
<%_ if (options.vant) { _%>
plugins.push(
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        // 指定样式路径
        style: name => `${name}/style/less`
      },
      'vant'
    ]
  )
<%_ } _%>
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: plugins
}