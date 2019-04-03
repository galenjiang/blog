## 项目目录

- build webpack 配置目录
- dist 发布
- dev 开发测试服务

## 命令

- start
- build
- dll

## 项目特性

- editorconfig 编辑器插件初始化代码格式
- prettier
- babel 编译

## 可定制化设置

- browserslist 设置库的兼容性，由 babel 自动 polyfill
- ts-config 设置

## 编辑器设置

vscode

```
"eslint.validate": [
  "javascript",
  "javascriptreact",
  {"language": "typescript", "autoFix": false },
  {"language": "typescriptreact", "autoFix": false }
]
```

webstorm 还没有完全适配

## issue

必须依赖@types/react-css-modules，否则 styleName 会报错
