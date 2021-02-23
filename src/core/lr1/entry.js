import { lexx } from './lexer.js'
import { parse } from './parser.js'
import { Generator } from './generator.js'
import { Grammar } from '../common/grammar.js'

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

export function convertTable(table) {
  return Object.entries(table).map(([k, v]) => {
    let value = Object.entries(v)
      .map(([ik, iv]) => `${ik}: ${iv}`)

    return `${k}: { ${value.join(" ")} }`
  })
}

// tryParse("1 + 2 * 3 - 4 / 5")