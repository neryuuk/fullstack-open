const reverse = string => string.split('').reverse().join('')

const average = (array) => {
  const reducer = (sum, item) => sum + item
  if (!array || !array.length) return 0
  return array.reduce(reducer, 0) / array.length
}

module.exports = { reverse, average }
