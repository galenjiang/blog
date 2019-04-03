import React from 'react'
import { Link } from 'react-router-dom'
import './style.module.css'

interface Props {
  file: string
  name: string
  date: string
}

export function CustomLink(props: Props) {
  const { name, file, date } = props
  return (
    <div styleName="link">
      <Link to={`/article/${file}`}>{name}</Link>
      <span>{date}</span>
    </div>
  )
}
