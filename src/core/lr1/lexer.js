import { lexx as ll1lexx } from '../tdop/lexer.js'

function i(number) {
  return {
    label: "i",
    value: number
  }
}

function raw(c) {
  return {
    label: c,
    value: c
  }
}


export function lexx(text) {
  let res = ll1lexx(text)

  res.push("$")

  return res.map(c => {
    if (typeof c == "number")
      return i(c)
    else
      return raw(c)
  })
}