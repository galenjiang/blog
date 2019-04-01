import { map } from 'ramda'
import './containers/app'
import './style.css'
import { test } from './components/test1'

console.log(map((text: string) => text.toUpperCase())('index'))

console.log('index')
test()
