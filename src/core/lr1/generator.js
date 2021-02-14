export class Generator {
  T = []
  NT = []
  g = []
  firstSet = {}

  constructor(grammar) {
    this.NT = grammar.NT
    this.T = grammar.T
    this.g = grammar.g

    this.firstSet = grammar.NT.reduce((acc, e) => {
      acc[e] = this.first(e)
      return acc
    }, {})
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

  follow(item, res = {}, record = {}) {

    item.forEach(([left, right]) => {
      let end = right[right.length - 1]

      if (this.NT.includes(end)) {
        if (record[end] == undefined)
          record[end] = []

        if (!record[end].includes(left) && end != left)
          record[end].push(left)
      }
    })

    let [ls, rs] = item.reduce((acc, e) => {
      let [left, right] = e
      acc[0].push(left)
      acc[1].push([...right])
      return acc
    }, [[], []])

    ls.forEach(l => {
      if (res[l] == undefined)
        res[l] = []

      rs.forEach(r => {
        while (r.length != 0) {
          let index = r.indexOf(l)

          if (index == -1 || index == r.length - 1)
            break

          r.splice(0, index + 1)

          if (this.T.includes(r[0]))
            res[l].push(r[0])
          else
            res[l].push(this.firstSet[r[0]])
        }
      })

      if (!res[l].includes("$")) {
        res[l].unshift("$")
      }
    })

    Object.entries(record).forEach(([child, ps]) =>
      ps.flatMap(p => res[p])
        .forEach(t => {
          if (res[child] == undefined)
            res[child] = []

          if (!res[child].includes(t))
            res[child].push(t)
        })
    )

    return res
  }

  forward(rule) {
    let [left, right, p, lhd] = rule

    if (p == undefined)
      p = 0
    else if (p < right.length)
      p = p + 1

    return [left, right, p, lhd].filter(e => e != undefined)
  }

  closure(rule, res = []) {
    let not_visit = [rule]

    while (not_visit.length != 0) {

      let head = not_visit.shift()

      if (!res.find(e => e.join() == head.join())) {
        res.push(head)

        let [, right, p] = head

        if (p == right.length)
          continue

        if (this.NT.includes(right[p])) {
          this.rules(right[p])
            .map(r => this.forward(r))
            .forEach(r => not_visit.push(r))
        }
      }
    }

    let followSet = this.follow(res)
    res.forEach(r => {
      let [, , , lhd] = r

      if (lhd == undefined)
        r.push(followSet[r[0]])
      else
        followSet[r[0]]
          .filter(t => !lhd.includes(t))
          .forEach(t => lhd.push(t))
    })

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

      acc[key].push(this.forward(cur))

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
    const init = this.rules("S'").map(r => this.forward(r)).flatMap(r => this.closure(r))

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