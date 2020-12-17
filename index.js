#!/usr/bin/env node
const path = require('path')
const preset = path.resolve(__dirname, 'my-preset')

const program = require('commander')
const execa = require('execa')

program
  .version(require('./package').version)
  .description('基于vue-cli的定制脚手架')
  .usage('<command> [options]')

program
  .command('go <project-name>')
  .description('使用定制preset创建vue-cli项目')
  .action(function(project) {
    let command = `vue create ${project} --preset ${preset}`
    const child = execa.shell(command, {
      stdio: 'inherit'
    })
  })

//除了专有的go命令，其他的命令都转交给vue-cli
program.command('*').action(function() {
  let command = process.argv.slice(2)
  command.unshift('vue')

  const child = execa.shell(command.join(' '), {
    stdio: 'inherit'
  })
})

program.parse(process.argv)
