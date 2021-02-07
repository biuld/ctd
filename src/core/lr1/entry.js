import { lexx } from './lexer.js'
import { parse } from './parser.js'

export const tryParse = text => parse(lexx(text))

console.log(tryParse("1 * 2 + 3 - 4 / 5"))

// export const parseTree = text => undefined