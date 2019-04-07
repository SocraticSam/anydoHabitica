const { Map } = require('immutable')

function toCreate (first, second) {
  const onlyInSecond =
    second.filterNot((todoInFirst) => {
      return first.find((todoInSecond) => {
        return todoInFirst.asMap().get('alias') === todoInSecond.asMap().get('alias')
      })
    })

  return onlyInSecond
}

function toCompleteOrIncomplete (first, second) {
  const needUpdating =
    first.filter((todoInFirst) => {
      const todoInSecond = second.find((todoInSecond) => {
        return todoInFirst.asMap().get('alias') === todoInSecond.asMap().get('alias')
      })
      return todoInSecond &&
        (todoInFirst.asMap().get('completed') !== todoInSecond.asMap().get('completed'))
    })
  return needUpdating
}

function toUpdate(first, second) {
  const needUpdating =
    second.filter((todoInSecond) => {
      const todoInFirst = first.find((todoInFirst) => {
        return todoInSecond.asMap().get('alias') === todoInFirst.asMap().get('alias')
      })
      return todoInFirst &&
        (todoInSecond.asMap().get('date') !== (todoInFirst.asMap().get('date'))
        || todoInSecond.asMap().get('text') !== (todoInFirst.asMap().get('text'))
        || todoInSecond.asMap().get('notes') !== (todoInFirst.asMap().get('notes'))
        || todoInSecond.asMap().get('priority') !== (todoInFirst.asMap().get('priority')))
    })
  return needUpdating
}

module.exports = {
  toCreate: toCreate,
  toCompleteOrIncomplete: toCompleteOrIncomplete,
  toUpdate: toUpdate
}