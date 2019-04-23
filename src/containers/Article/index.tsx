import React from 'react'
import { withRouter } from 'react-router'

import codegen from 'babel-plugin-codegen/macro'
import './style.module.css'
import { articleMap } from '../../md/list'
import { CodeBlock } from '../../components/CodeBlock'

// eslint-disable-next-line
codegen`
const fs = require('fs')
const path = require('path')
const files = fs.readdirSync(path.resolve(__dirname, '..', '..', 'md'))
function camelCase(string) {
  return string.split('-').reduce((s, singleString, index) => {
    const firstLetter = singleString[0].toUpperCase()
    return \`\${s}\${firstLetter}\${singleString.slice(1)}\`
  }, '')
}

const importStatement = files.reduce((s, file) => {

  if (file === 'list.ts') {
    return s
  }
  return \`\${s}
  import \${camelCase(file.split('.')[0])} from '../../md/\${file}'
  \`
}, '')

let importMap = \`
const componentMap = {
\`
importMap = importMap + files.reduce((m, file, index) => {
  if (file === 'list.ts') {
    return m
  }
  const name = file.split('.')[0]
  const func = camelCase(file.split('.')[0])
  return m + '"'+ name + '": ' + func + ','
}, '')
importMap = importMap + '}'
module.exports = importStatement + ';' + importMap
`
declare const componentMap: any
function DynamicArticle({
  match: {
    params: { name },
  },
}: any) {
  const CustomizeComponent = componentMap[name]
  const article = articleMap.find(item => item.file === name)
  if (article) {
    return (
      <div className="container article" styleName="article">
        <h2 styleName="title">{article.name}</h2>
        <p styleName="date">{article.date}</p>
        <hr />
        <br />
        <CustomizeComponent
          components={{
            code: CodeBlock,
          }}
        />
      </div>
    )
  }
  return null
}

export const withRouterDynamicDynamicArticle = withRouter(DynamicArticle)
