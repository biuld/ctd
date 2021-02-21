const gram = {
  T: ["i", "+", "-", "*", "/"],
  NT: ["expr", "term", "factor"],
  g: [
    ["S'", ["expr"]],
    ["expr", ["expr", "+", "term"]],
    ["expr", ["expr", "-", "term"]],
    ["expr", ["term"]],
    ["term", ["term", "*", "factor"]],
    ["term", ["term", "/", "factor"]],
    ["term", ["factor"]],
    ["factor", ["i"]],
  ]
}

export class Grammar {
  constructor(T, NT, g) {
    this.T = T || gram.T
    this.NT = NT || gram.NT
    this.g = g || gram.g
  }

  rules(left) {
    return this.g.filter(r => r[0] === left)
  }

  remove(rule) {
    let index = this.g.map(e => e.join()).indexOf(rule.join())
    this.g.splice(index, 1)
  }

  contains(rule) {
    return this.g.find(e => e.join() === rule.join())
  }

  replace(key, value) {
    let neo = new Grammar()
    neo[key] = value
    return neo
  }
}