
function alter(NT) {
  return "alter" + NT
}

function epsilon(NT) {
  return [NT, [""]]
}

function remove_direct(gram, nt) {
  let [not_rec, rec] = gram.rules(nt)
    .reduce((acc, rule) => {
      let [left, [l,]] = rule

      if (left === l)
        acc[1].push(rule)
      else
        acc[0].push(rule)

      return acc
    }, [[], []])

  if (rec.length != 0) {
    let al = alter(nt)

    not_rec.forEach(([, right]) => right.push(al))
    rec.forEach(rule => {
      rule[0] = al
      rule[1].shift()
      rule[1].push(al)
    })

    gram.NT.push(al)
    gram.g.push(epsilon(al))
  }
}

export function eliminate(gram) {
  for (let i = 0; i < gram.NT.length; i++) {
    gram
      .rules(gram.NT[i])
      .filter(([, [l,]]) => gram.NT.includes(l))
      .forEach(cur => {
        let not_visit = [cur]
        let res = []

        while (not_visit.length != 0) {
          let h = not_visit.shift()

          let [left, [l, ...right]] = h

          if (left === l || gram.T.includes(l)) {
            res.push(h)
            continue
          }

          for (let j = 0; j < i; j++) {
            let aj = gram.NT[j]

            if (aj === l)
              gram.rules(aj)
                .map(([, r]) => [left, r.concat(right).filter(e => e != undefined)])
                .forEach(rule => not_visit.push(rule))
          }
        }

        if (res.length != 0) {
          gram.remove(cur)
          res
            .filter(e => !gram.contains(e))
            .forEach(e => gram.g.push(e))
          remove_direct(gram, gram.NT[i])
        }
      })
  }
}

export function convert(g) {
  return g.map(([left, right]) => `${left} => ${right.join(" ")}`)
}

// const T = ["a", "b", "c"]
// const NT = ["S", "Q", "R"]
// const g = [
//   ["S", ["Q", "c"]],
//   ["S", ["c"]],
//   ["Q", ["R", "b"]],
//   ["Q", ["b"]],
//   ["R", ["S", "a"]],
//   ["R", ["a"]]
// ]

// let gram = new Grammar(T, NT, g)
// eliminate(gram)
// console.log(gram.g)