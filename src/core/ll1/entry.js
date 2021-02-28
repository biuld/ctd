

export function convert(o) {
  return Object.entries(o).map(([k, v]) => `${k}: ${v.join("， ")}`)
}
