const {
  override, 
  fixBabelImports,
  addDecoratorsLegacy, 
  addWebpackAlias 
} = require("customize-cra")
const path = require('path');

// override
// 实现原理类似vue.config.js 
// 生成webpack配置项，merge到原配置项里
module.exports = override(
  // antd 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  // WebpackAlias
  addWebpackAlias({
    '@': path.resolve(__dirname,'src')
  }),
  // 支持装饰器配置
  addDecoratorsLegacy()
);