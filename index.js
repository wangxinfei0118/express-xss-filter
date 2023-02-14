const xss = require('xss')

const xssFilter = (keys = ['body', 'query', 'params'], options) => { // 默认对 body, query, params 全部进行过滤
  keys = [].concat(keys) // 'body' 转化为 ['body']
  return (req, res, next) => {
    keys.forEach(key => {
      if (req[key]) {
        req[key] = filter(req[key], options)
      }
    })
    next()
  }
}

const filter = (content, options, map = new WeakMap()) => {
  if (typeof content !== 'object'){
    return xss(content, options)
  }

  if (content instanceof Date || content instanceof RegExp) return new Date(content)
  if (map.has(content)) return map.get(content)

  const filtered = new content.constructor() // 判断对象还是数组

  map.set(content, filtered)

  for (const key in content) {
    if (content.hasOwnProperty(key)) {
      filtered[key] = filter(content[key], options, map)
    }
  }
  return filtered
}

module.exports = xssFilter
