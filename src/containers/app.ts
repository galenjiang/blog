// import './style.css'
import { map } from 'ramda'

console.log(map((text: string) => text.toUpperCase())('app'))

import('../components/test2').then(({ test }) => {
  test()
})
