import { lexx as ll1lexx } from '../ll1/lexer'
import { i, OP } from './parser'


export function lexx(text) {
  let res = ll1lexx(text)

  res.push("$")

  return res.map(e => {
    if (typeof e == "number") {
      return i(e)
    }

    switch (e) {
      case "+":
      case "-":
      case "*":
      case "/":
        return OP(e)
      case "$":
        return {
          type: "$",
          label: "$",
          value: "$"
        }
    }
  })
}