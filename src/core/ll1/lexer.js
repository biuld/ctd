import { getInt, isDigit, } from '../util'

export function lexx(text, res = []) {

  if (text.length == 0) {
    return res
  }

  let [h, ...tail] = text

  if (isDigit(h)) {
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