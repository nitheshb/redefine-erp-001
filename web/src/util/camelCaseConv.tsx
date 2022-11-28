export const camalize = function camalize(str) {
  return str
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
      return chr?.toUpperCase()
    })
}
