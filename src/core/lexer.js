

function isDigt(c) {
  return c >= '0' && c <= '9'
}

function span(f = _ => true, array) {
  let init = []

  for (const e of array) {
    if (f(e))
      init.push(e)
    else
      break
  }

  return [init, array.slice(init.length)]
}

// console.log(span(isDigt, ["1", "2", "#"]))

function getInt(text) {
  let [init, rest] = span(isDigt, text)
  return [Number.parseInt(init.join("")), rest]
}

export function lexx(text, res = []) {

  if (text.length == 0) {
    return res
  }

  let [h, ...tail] = text

  if (isDigt(h)) {
    let [init, rest] = getInt(text)
    res.push(init)
    return lexx(rest, res)
  } else {
    switch (h) {
      case "+":
      case "-":
      case "*":
      case "/":  
        res.push(h)
        return lexx(tail, res)
      case " ":
        return lexx(tail, res)
      default:
        return `unsupported character ${h}`
    }
  }
}

// console.log(lexx("1 + 2"))
// console.log(lexx("12 + 3"))
// console.log(lexx("1a+2"))