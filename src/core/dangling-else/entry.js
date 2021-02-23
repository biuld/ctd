
function lexx(text) {
  return text.split(/[\s(){}]+/).filter(e => e != "")
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

function parse(tokens) {
  let [if_token, id, ...tail] = tokens
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

function convert(t) {
  switch (typeof t) {
    case "string":
      return { name: t }
    case "object": {
      let [id, l, r] = t
      return {
        name: id,
        children: [
          convert(l),
          convert(r)
        ].filter(e => e != null)
      }
    }
  }
}

export const tryParse = text => parse(lexx(text))[0]

export const parseTree = text => convert(tryParse(text))

export const initialCode =`
if (a) {
  if (b) 
    A 
  else 
    B 
} else { 
  if (c) 
    C 
  else 
    D
}`