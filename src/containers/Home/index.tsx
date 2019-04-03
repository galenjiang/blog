import React from 'react'
import './style.module.css'
import logo from './logo.jpeg'
import { CustomLink } from '../../components/CustomLink'
import { articleMap } from '../../md/list'

export function Home() {
  return (
    <div styleName="home">
      <header styleName="header">
        <div className="container" styleName="wrapper">
          <img styleName="logo" src={logo} alt="logo" />
          <span> galen&apos;s blog</span>
        </div>
      </header>
      <section>
        <div className="container">
          {articleMap.map(article => (
            <CustomLink
              key={article.file}
              file={article.file}
              name={article.name}
              date={article.date}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
