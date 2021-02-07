import { lexx } from './lexer.js'
import { parse } from './parser.js'

export const tryParse = text => parse(lexx(text))

export const parseTree = text => convert(tryParse(text))

function convert(e) {
  switch (e.label) {
    case "expr":
      return {
        name: "expr",
        children: e.value.map(convert)
      }
    case "term":
      return {
        name: "term",
        children: e.value.map(convert)
      }
    case "factor": {
      return {
        name: "factor",
        children: [{ name: e.value }]
      }
    }
    default:
      return {
        name: e.label
      }
  }
}