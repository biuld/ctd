import { Generator } from './generator.js'
import { Grammar } from './grammar.js'

export function parse(tokens, state = [0], symbol = []) {

  let gram = new Grammar()
  let gen = new Generator(gram)
  let table = gen.parsingTable
  // console.log(table)

  for (; ;) {
    let s = state[0]
    let h = tokens.shift()

    let cell = table[s][h.label]

    // console.log(`s: ${s}, h:${h.value}`)
    if (cell == undefined) {
      let msg = `unexpected token ${h.value} at ${s}`
      throw new Error(msg)
    }

    if (cell == "acc") {
      console.log("accepted!")
      break
    }

    if (cell[0] == "r") {
      gram.symbol_reduce(cell, symbol)
      gram.state_reduce(cell, state, table)
      tokens.unshift(h)
      continue
    }

    state.unshift(cell)
    symbol.unshift(h)
  }

  return symbol[0]
}