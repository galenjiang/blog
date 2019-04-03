const fs = require('fs')
const files = fs.readdirSync('./md')
console.log(
  files.reduce((s, file) => {
    return `${s}
  import ${file.split('.')[0]} from './${file}'
  `
  }, ''),
)

function camelCase(string) {
  return string.split('-').reduce((s, singleString, index) => {
    if (index !== 0) {
      const firstLetter = singleString[0].toUpperCase()
      return `${s}${firstLetter}${singleString.slice(1)}`
    }
    return `${s}${singleString}`
  }, '')
}

console.log(camelCase('abc-def'))
