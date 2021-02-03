
function Figure(i) {

  if (typeof i != "number") {
    let msg = `expected a number, got a ${i}:${typeof i}`
    throw new Error(msg)
  }

  return {
    type: "Figure",
    value: i
  }
}

function Binary(t, l, r) {
  return {
    type: "Binary",
    op: t,
    lhs: l,
    rhs: r
  }
}

function getOpPrecedence(op) {
  switch (op) {
    case "*":
    case "/":
      return 2
    case "+":
    case "-":
      return 1
    default:
      return 0
  }
}

function parseFigure(tokens) {
  let [h, ...tail] = tokens

  if (typeof h == "number")
    return [Figure(h), tail]
  else
    return `expected a number, got ${h}`
}

function parseBinary(tokens, precedence = 0) {
  let [l, [op, ...tail]] = parseFigure(tokens)

  if (op == undefined) {
    return [l, []]
  }

  switch (op) {
    case "+":
    case "-":
    case "*":
    case "/": {
      let p = getOpPrecedence(op)
      if (p > precedence) {
        let [r, rst] = parseExpr(tail, p)
        return [Binary(op, l, r), rst]
      } else {
        tail.unshift(op)
        return [l, tail]
      }
    }
    default:
      return `expected an op, got a ${op}`
  }
}

function tryRestart(res) {
  let [l, [op, ...tail]] = res
  if (op == undefined)
    return res

  switch (op) {
    case "+":
    case "-":
    case "*":
    case "/": {
      let [r, rst] = parseExpr(tail, getOpPrecedence(op))
      let result = [Binary(op, l, r), rst]

      if (rst.length != 0)
        return tryRestart(result)
      else
        return result
    }
    default:
      return `expected an op, got a ${op}`
  }
}

function parseExpr(tokens, precedence = 0) {
  return parseBinary(tokens, precedence)
}

export function parse(tokens) {
  let [tree, ,] = tryRestart(parseExpr(tokens))
  return tree
}