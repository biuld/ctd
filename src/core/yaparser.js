
const T = ["i", "+"]
const NT = ["E", "OP"]
const g = [
  ["S'", ["E"]],
  ["E", ["E", "OP", "E"]],
  ["OP", ["+"]],
  ["E", ["i"]]
]

// const T = ["a", "b", "c", "d", "e"]
// const NT = ["S", "A"]
// const g = [
//   ["S'", ["S"]],
//   ["S", ["a", "A", "d"]],
//   ["S", ["b", "A", "c"]],
//   ["S", ["a", "e", "c"]],
//   ["S", ["b", "e", "d"]],
//   ["A", ["e"]]
// ]

function rules(left) {
  return g.filter(r => r[0] == left)
}

function first(token, res = [], visited = []) {

  if (token == undefined)
    return undefined

  let not_visit = [token]

  while (not_visit.length != 0) {
    let head = not_visit.shift()

    if (T.includes(head) && !res.includes(head)) {
      res.push(head)
      continue
    }

    visited.push(head)

    rules(head)
      .map(([, right]) => right[0])
      .filter(t => !visited.includes(t))
      .forEach(t => not_visit.push(t))
  }

  return res
}

function prepare(rule, LHD = ["$"], P = 0) {
  let [left, right, p, lhd] = rule

  if (p == undefined)
    p = P
  else if (p < right.length)
    p = p + 1

  if (lhd == undefined)
    lhd = LHD

  return [left, right, p, lhd]
}

function closure(rule, res = []) {
  let not_visit = [rule]

  while (not_visit.length != 0) {

    let head = not_visit.shift()

    if (!res.find(e => e.join() == head.join()))
      res.push(head)

    let [, right, p, ,] = head

    if (p == right.length)
      continue

    if (NT.includes(right[p])) {
      rules(right[p])
        .map(r => prepare(r, first(right[p + 1])))
        .filter(r => !res.find(e => e.join() == r.join()))
        .forEach(r => not_visit.push(r))
    }
  }

  return res
}

function nextItems(c) {
  let item = c.reduce((acc, cur) => {
    let [, right, p] = cur

    if (p == right.length)
      return acc

    let key = right[p]

    if (acc[key] == undefined) {
      acc[key] = []
    }

    acc[key].push(prepare(cur))

    return acc
  }, {})

  Object.keys(item).forEach(k => {
    item[k] = item[k].flatMap(kernel => closure(kernel))
      .reduce((acc, cur) => {
        if (!acc.find(e => e.join() == cur.join()))
          acc.push(cur)
        return acc
      }, [])
  })

  return item
}

function findIndex(res, item) {
  return res.map(e => e.join()).indexOf(item.join())
}

function itemSet(init, res = [], go = {}) {

  let not_visit = [init]

  while (not_visit.length != 0) {

    let head = not_visit.shift()
    res.push(head)
    let no = res.length - 1

    Object.entries(nextItems(head))
      .map(([token, item], index) => {
        if (go[no] == undefined)
          go[no] = {}

        let i = findIndex(res, item)

        if (i == -1)
          i = res.length + not_visit.length + index

        Object.assign(go[no], { [token]: i })

        return item
      }).filter(item => !res.find(s => s.join() == item.join()))
      .forEach(item => not_visit.push(item))
  }

  return [res, go]
}

const init = rules("S'").map(r => prepare(r)).flatMap(r => closure(r))

// console.log(init)
let [res, go] = itemSet(init)
console.log(JSON.stringify(res))
console.log(go)