export class Generator {
  gram
  firstSet = {}
  followSet = {}

  constructor(grammar) {
    this.gram = grammar

    this.firstSet = grammar.NT.reduce((acc, t) => {
      acc[t] = this.first(t)
      return acc
    }, {})

    this.followSet = this.follow(grammar.g)
  }

  first(token, res = [], visited = []) {

    if (token == undefined)
      return undefined

    let not_visit = [token]

    while (not_visit.length != 0) {
      let head = not_visit.shift()

      if (this.gram.T.includes(head) && !res.includes(head)) {
        res.push(head)
        continue
      }

      visited.push(head)

      this.gram.rules(head)
        .map(([, right]) => right[0])
        .filter(t => !visited.includes(t))
        .forEach(t => not_visit.push(t))
    }

    return res
  }

  follow(item, res = {}, record = {}) {

    item.forEach(([left, right]) => {
      let end = right[right.length - 1]

      if (this.gram.NT.includes(end)) {
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

          if (this.gram.T.includes(r[0]))
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
}