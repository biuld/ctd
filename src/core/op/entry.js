import { lexx } from '../common/lexer.js'
import { parse } from './parser.js'

export const tryParse = text => parse(lexx(text))

export const parseTree = text => convert(tryParse(text))

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