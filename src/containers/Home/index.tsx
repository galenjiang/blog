import React from 'react'
import { Link } from 'react-router-dom'
import './style.module.css'

export function Home() {
  return (
    <div styleName="home">
      <h3>my blog</h3>
      <Link to="/article/json-schema">json-schema</Link>
      <br />
      <Link to="/article/key-thinking">key-thinking</Link>
    </div>
  )
}
