import { lexx } from './lexer'
import { parse } from './parser'

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

export function getParseTree(text) {
  return convert(parse(lexx(text)))
}