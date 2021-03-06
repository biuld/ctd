// import { m } from './nfa.js'

function e_closure(s, m, res = []) {
  let not_visit = [].concat(s)

  while (not_visit.length != 0) {
    let h = not_visit.shift()

    if (!res.includes(h)) {
      res.push(h)

      if (m.f[h] != undefined)
        if (m.f[h].none != undefined)
          m.f[h].none.forEach(i => not_visit.push(i))
    }
  }

  return res.sort()
}

// m.K.forEach(i => console.log(e_closure(i, m)))

function move(s, t, m,) {
  return s
    .map(i => m.f[i])
    .filter(i => i != undefined)
    .flatMap(i => i[t])
    .filter(i => i != undefined)
}

// console.log(move(e_closure(0, m), "a", m))

export function determine(m) {
  let not_visit = [e_closure(m.S, m)]
  let nk = []
  let nf = {}

  while (not_visit.length != 0) {

    let h = not_visit.shift()
    nk.push(h)
    let id = nk.length - 1

    m.t
      .forEach(i => {
        let next = e_closure(move(h, i, m), m)

        let index = nk.concat(not_visit)
          .map(e => e.join())
          .indexOf(next.join())

        if (index == -1) {
          not_visit.push(next)
          index = id + not_visit.length
        }

        if (nf[id] == undefined)
          nf[id] = {}

        if (nf[id][i] == undefined)
          nf[id][i] = []

        nf[id][i].push(index)
      })
  }

  let nm = { ...m }
  nm.K = [...Array(nk.length).keys()]
  nm.f = nf
  nm.Z = [nk.length - 1]

  return nm
}

// console.log(determine(m))

export function convert(m) {

  let nodes = m.K.map(i => {
    if (i == m.S)
      return {
        name: i,
        symbol: "triangle"
      }
    else if (m.Z.includes(i))
      return {
        name: i,
        symbol: "rectangle"
      }
    else
      return {
        name: i
      }
  })

  let links = Object.entries(m.f).reduce((acc, [s, dest]) => {
    Object.entries(dest).flatMap(([edge, targets]) =>
      targets.map(t => {
        return {
          source: `${s}`,
          target: `${t}`,
          value: edge,
        }
      })).forEach(l => acc.push(l))
    return acc
  }, [])

  return {
    data: nodes,
    links: links
  }
}