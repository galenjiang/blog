### 概述

[json schema](http://json-schema.org/latest/json-schema-validation.html)用于描述 JSON 实例的验证

### 相关库

[ajv](https://github.com/epoberezkin/ajv)

### 默认值

default
ajv 可以用来补充空值, 不能用于非 properties，和非 items 数组类型里面，否则忽略

```javascript
var Ajv = require('ajv')

var ajv = new Ajv({ useDefaults: 'empty' })
var schema = {
  type: 'array',
  items: {
    type: ['object'],
    properties: {
      foo: {
        type: 'array',
        items: {
          type: 'string',
        },
        default: [],
      },
      bar: { type: ['string'], default: 'baz' },
    },
    required: ['foo', 'bar'],
  },
  default: [],
}

var data = [{ bar: null, foo: '' }]

var validate = ajv.compile(schema)

console.log(validate(data))
console.log(data)
```
