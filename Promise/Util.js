function map2 (first, second, f) {
  return Promise.all([first, second])
    .then((values) => f(values[0], values[1]) )
}

module.exports = {
  map2: map2
}
