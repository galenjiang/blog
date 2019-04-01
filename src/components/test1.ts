import { map } from 'ramda'

export const test = () => {
  console.log('hello test')
}

console.log(map((text: string) => text.toUpperCase())('app'))
