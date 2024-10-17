const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/JingzheZhao.github.io/'  // Change this to your GitHub repo name
    : '/',
  transpileDependencies: true
})
