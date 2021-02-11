export class Generator {
  T = []
  NT = []
  g = []

  constructor(grammar) {
    this.NT = grammar.NT
    this.T = grammar.T
    this.g = grammar.g
  }

  rules(left) {
    return this.g.filter(r => r[0] == left)
  }

  first(token, res = [], visited = []) {

    if (token == undefined)
      return undefined

    let not_visit = [token]

    while (not_visit.length != 0) {
      let head = not_visit.shift()

      if (this.T.includes(head) && !res.includes(head)) {
        res.push(head)
        continue
      }

      visited.push(head)

      this.rules(head)
        .map(([, right]) => right[0])
        .filter(t => !visited.includes(t))
        .forEach(t => not_visit.push(t))
    }

    return res
  }

  prepare(rule, LHD = ["$"], P = 0) {
    let [left, right, p, lhd] = rule

    if (p == undefined)
      p = P
    else if (p < right.length)
      p = p + 1

    if (lhd == undefined || lhd.length == 0)
      lhd = LHD

    return [left, right, p, lhd]
  }

  closure(rule, res = []) {
    let not_visit = [rule]

    while (not_visit.length != 0) {

      let head = not_visit.shift()

      if (!res.find(e => e.join() == head.join())) {
        res.push(head)

        let [, right, p, llhd] = head

        if (p == right.length)
          continue

        if (this.NT.includes(right[p])) {

          let lhd = [].concat(this.first(right[p + 1]))
            .concat(llhd)
            .filter(e => e != undefined)

          this.rules(right[p])
            .map(r => this.prepare(r, lhd))
            .forEach(r => not_visit.push(r))
        }
      }
    }

    return res
  }

  nextItems(c) {
    let item = c.reduce((acc, cur) => {
      let [, right, p] = cur

      if (p == right.length)
        return acc

      let key = right[p]

      if (acc[key] == undefined) {
        acc[key] = []
      }

      acc[key].push(this.prepare(cur))

      return acc
    }, {})

    Object.keys(item).forEach(k => {
      item[k] = item[k].flatMap(kernel => this.closure(kernel))
        .reduce((acc, cur) => {
          if (!acc.find(e => e.join() == cur.join()))
            acc.push(cur)
          return acc
        }, [])
    })

    return item
  }

  static findIndex(res, item) {
    return res.map(e => e.join()).indexOf(item.join())
  }

  itemSet(init, res = [], go = {}) {

    let not_visit = [init]

    while (not_visit.length != 0) {

      let head = not_visit.shift()
      res.push(head)
      let no = res.length - 1

      Object.entries(this.nextItems(head))
        .forEach(([token, item]) => {
          let index = res.concat(not_visit)
            .map(e => e.join())
            .indexOf(item.join())

          if (index == -1) {
            not_visit.push(item)
            index = no + not_visit.length
          }

          if (go[no] == undefined)
            go[no] = {}

          go[no][token] = index
        })
    }

    return [res, go]
  }

  get parsingTable() {
    const init = this.rules("S'").map(r => this.prepare(r)).flatMap(r => this.closure(r))

    let [res, go] = this.itemSet(init)

    res.forEach((item, index) => {
      item
        .filter(([, right, p,]) => p == right.length)
        .forEach(([left, right, , lhd]) => {
          if (go[index] == undefined)
            go[index] = {}

          lhd.forEach(i => go[index][i] = `r${Generator.findIndex(this.g, [left, right])}`)

          if (left == "S'")
            go[index]['$'] = "acc"
        })
    })
    // console.log(JSON.stringify(res))
    return go
  }
}