import { lexx } from './lexer.js'
import { parse } from './parser.js'
import { Generator } from './generator.js'
import { Grammar } from './grammar.js'

const grammar = new Grammar()
const generator = new Generator(grammar)

export const table = generator.parsingTable

export const tryParse = text => parse(lexx(text), grammar, table)

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

// tryParse("1 + 2 * 3 - 4 / 5")