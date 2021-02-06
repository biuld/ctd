import { lexx as ll1lexx } from './ll1/lexer'
import { parse as ll1parse } from './ll1/parser'

export function isDigit(c) {
  return c >= '0' && c <= '9'
}

function span(f = _ => true, array) {
  let init = []

  for (const e of array) {
    if (f(e))
      init.push(e)
    else
      break
  }

  return [init, array.slice(init.length)]
}

// console.log(span(isDigit, ["1", "2", "#"]))

export function getInt(text) {
  let [init, rest] = span(isDigit, text)
  return [Number.parseInt(init.join("")), rest]
}

function convert(e) {
  switch (e.type) {
    case "Figure":
      return {
        name: "F",
        children: [
          { name: e.value }
        ]
      }
    case "Binary":
      return {
        name: "B",
        children: [
          convert(e.lhs),
          { name: e.op },
          convert(e.rhs)
        ]
      }
  }
}

export function getLL1ParseTree(text) {
  return convert(ll1parse(ll1lexx(text)))
}