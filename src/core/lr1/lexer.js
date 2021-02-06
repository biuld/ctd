import {lexx as ll1lexx } from '../ll1/lexer'

export function lexx(text) {
  let res = ll1lexx(text)
  res.push("$")
  return res
}