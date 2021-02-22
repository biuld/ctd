
export function lexx(text) {
  return text.split(/[\s\(\)]+/).filter(e => e != "")
}

function Stat(id, l, r) {
  return [id, l, r].filter(e => e != undefined)
}

function token_check(expected, got) {
  if (expected != got) {
    let msg = `expected ${expected}, got ${got}`
    throw new Error(msg)
  }
}

export function parse(tokens) {
  let [if_token, id, , ...tail] = tokens
  if (if_token === "if") {
    let next

    if (tail[0] === "if")
      next = parse(tail)
    else
      next = tail

    let [l, else_token, ...rst] = next

    if (else_token != undefined) {
      token_check("else", else_token)
      let [r, ...rrst] = parse(rst)
      return [Stat(id, l, r), ...rrst]
    } else
      return [Stat(id, l)]

  } else
    return tokens
}


let text = [
  "if true then A else B",
  "if true then (if true then A else B)",
  "if true then (if true then A else B) else C",
  "if true then (if true then A else (if true then C))",
  "if true then (if true then A else B) else (if true then C)",
  "if true then (if true then A else B) else (if true then C else D)"
]

text.map(t => JSON.stringify(parse(lexx(t)))).forEach(e => console.log(e))