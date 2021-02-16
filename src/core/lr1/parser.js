function expr(...right) {
  return {
    label: "expr",
    value: [].concat(right)
  }
}

function term(...right) {
  return {
    label: "term",
    value: [].concat(right)
  }
}

function factor(i) {
  return {
    label: "factor",
    value: i.value
  }
}

function symbol_reduce(cell, symbol) {
  switch (cell) {
    case "r1":
    case "r2": {
      let [r, op, l] = symbol.splice(0, 3)
      symbol.unshift(expr(l, op, r))
      break
    }
    case "r3": {
      let term = symbol.shift()
      symbol.unshift(expr(term))
      break
    }
    case "r4":
    case "r5": {
      let [r, op, l] = symbol.splice(0, 3)
      symbol.unshift(term(l, op, r))
      break
    }
    case "r6": {
      let factor = symbol.shift()
      symbol.unshift(term(factor))
      break
    }
    case "r7": {
      let i = symbol.shift()
      symbol.unshift(factor(i))
      break
    }
  }
}

function state_reduce(cell, state, table, gram) {
  let index = cell.substring(1)
  let [left, right] = gram.g[index]
  state.splice(0, right.length)
  state.unshift(table[state[0]][left])
}


export function parse(tokens, gram, table, state = [0], symbol = []) {

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
      symbol_reduce(cell, symbol)
      state_reduce(cell, state, table, gram)
      tokens.unshift(h)
      continue
    }

    state.unshift(cell)
    symbol.unshift(h)
  }

  return symbol[0]
}