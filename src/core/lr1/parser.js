import { Generator } from './generator'

const T = ["i", "+"]
const NT = ["E", "OP"]
const g = [
  ["S'", ["E"]],
  ["E", ["E", "OP", "E"]],
  ["OP", ["+"]],
  ["E", ["i"]]
]

// highly couple with the grammar
function symbol_reduce(cell, symbol) {
  switch (cell) {
    case "r1": {
      let [r, op, l] = symbol.splice(0, 3)
      symbol.unshift(E(op, l, r))
      break
    }
    case "r2":
      break
    case "r3": {
      let i = symbol.shift()
      symbol.unshift(Ei(i))
      break
    }
  }
}

//highly couple with the grammar
function state_reduce(cell, state, table) {
  switch (cell) {
    case "r1":
      state.splice(0, 3)
      state.unshift(table[state[0]]["E"])
      break
    case "r2":
      state.shift()
      state.unshift(table[state[0]]["OP"])
      break
    case "r3":
      state.shift()
      state.unshift(table[state[0]]["E"])
      break
  }
}

export function i(number) {
  return {
    type: "i",
    label: "i",
    value: number
  }
}

export function OP(op) {
  return {
    type: "OP",
    label: op,
    value: op
  }
}

function E(op, l, r) {
  return {
    type: "E",
    label: "E",
    value: {
      lhs: l,
      op: op,
      rhs: r
    }
  }
}

function Ei(i) {
  return {
    type: "E",
    label: "E",
    value: i
  }
}

export function parse(tokens, state = [0], symbol = []) {

  let gen = new Generator(g, T, NT)
  let table = gen.parsingTable

  console.log(table)

  for (;;) {
    let s = state[0]
    let h = tokens.shift()

    let cell = table[s][h.label]

    if (cell == undefined) {
      let msg = `unexpected token ${h}`
      throw new Error(msg)
    }

    if (cell == "acc") {
      console.log("accepted!")
      break
    }

    if (cell[0] == "r") {
      symbol_reduce(cell, symbol)
      state_reduce(cell, state, table)
      tokens.unshift(h)
      continue
    }

    state.unshift(cell)
    symbol.unshift(h)
  }

  return symbol[0]
}