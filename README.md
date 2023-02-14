# express-xss-filter

## 安装

```bash
npm install xss
npm install express-xss-filter
```

## 导入

```js
const expressXssFilter = require('express-xss-filter')
```

## 参数

expressXssFilter接受两个参数，**第一个**参数为字符串或者数组，表示进行过滤的请求参数，可选值为body、 query、 params，当第一个参数为空时，默认全选。**第二个**参数用来配置过滤的规则，包括自定义白名单以及匹配标签属性的处理方法等。

## 使用

**作为全局中间件使用**

```js
const express = require('express')
const app = express()
app.use(express.json())

// 引入express-xss-filter
const expressXssFilter = require('express-xss-filter')
// 使用app.use调用，默认过滤全部参数
app.use(expressXssFilter())

app.post('/',function (req,res) {
  console.log(req.body)
})

app.listen(3010, function () {
  console.log('server running at http://127.0.0.1:3010')
})
```

**作为路由中间件使用**

```js
const express = require('express')
const router = express.Router()
const expressXssFilter = require('express-xss-filter')

// 对body中的数据进行过滤
router.post('/test', expressXssFilter('body') ,(req, res) => {
  console.log(req.body)
})

module.exports = router
```

## 自定义过滤规则

在调用 expressXssFilter 中间件进行过滤时，可通过第二个参数来设置自定义规则

```js
// 定义白名单
const options = {
  whiteList: {
    a: ['href', 'title', 'target']
  }
}

router.post('/test', expressXssFilter(options) ,(req, res) => {
  console.log(req.body)
})
```

更多的过滤规则，请参考 [xss](https://jsxss.com/zh/options.html) 的官方文档

