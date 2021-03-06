const {
  override, 
  fixBabelImports,
  addDecoratorsLegacy, 
  addWebpackAlias ,
  disableEsLint
} = require("customize-cra")
const path = require('path');

// override
// 实现原理类似vue.config.js 
// 生成webpack配置项，merge到原配置项里
module.exports = override(
  // antd 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es', // 在antd的es目录项查找
    style: 'css' // 依赖加载css文件
  }),
  // WebpackAlias
  addWebpackAlias({
    '@': path.resolve(__dirname,'src')
  }),
  // 支持装饰器配置
  addDecoratorsLegacy(),
  disableEsLint()
);