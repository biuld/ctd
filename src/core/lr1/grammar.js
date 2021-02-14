export class Grammar {
  T = ["i", "+", "-", "*", "/"]
  NT = ["expr", "term", "factor"]
  g = [
    ["S'", ["expr"]],
    ["expr", ["expr", "+", "term"]],
    ["expr", ["expr", "-", "term"]],
    ["expr", ["term"]],
    ["term", ["term", "*", "factor"]],
    ["term", ["term", "/", "factor"]],
    ["term", ["factor"]],
    ["factor", ["i"]],
  ]

  expr(...right) {
    return {
      label: "expr",
      value: [].concat(right)
    }
  }

  term(...right) {
    return {
      label: "term",
      value: [].concat(right)
    }
  }

  factor(i) {
    return {
      label: "factor",
      value: i.value
    }
  }

  symbol_reduce(cell, symbol) {
    switch (cell) {
      case "r1":
      case "r2": {
        let [r, op, l] = symbol.splice(0, 3)
        symbol.unshift(this.expr(l, op, r))
        break
      }
      case "r3": {
        let term = symbol.shift()
        symbol.unshift(this.expr(term))
        break
      }
      case "r4":
      case "r5": {
        let [r, op, l] = symbol.splice(0, 3)
        symbol.unshift(this.term(l, op, r))
        break
      }
      case "r6": {
        let factor = symbol.shift()
        symbol.unshift(this.term(factor))
        break
      }
      case "r7": {
        let i = symbol.shift()
        symbol.unshift(this.factor(i))
        break
      }
    }
  }

  state_reduce(cell, state, table) {
    let index = cell.substring(1)
    let [left, right] = this.g[index]
    state.splice(0, right.length)
    state.unshift(table[state[0]][left])
  }

}