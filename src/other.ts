import './containers/app'
import './style.css'

import { map } from 'ramda'
import { test as test1 } from './components/test1'

import { test as test2 } from './components/test2'

console.log(map((text: string) => text.toUpperCase())('index'))

test1()
test2()
