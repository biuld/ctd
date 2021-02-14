
export function parse(tokens, gram ,table, state = [0], symbol = []) {

  for (; ;) {
    let s = state[0]
    let h = tokens.shift()

    // console.log(`s: ${s}, h:${h.value}`)
    let cell = table[s][h.label]

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