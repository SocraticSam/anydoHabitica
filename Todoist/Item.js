const { Map } = require('immutable')
const Habitica = require('../Habitica/Task')

class Item {
  constructor ({ content, date_string, priority, indent, checked, is_deleted, project_id }) {
    const priorityName =
      Object.keys(priorities.toObject())
        .find((key) => {
          return priorities.toObject()[key] === priority
        })

    this.content = content;
    this.date = date_string;
    this.priority = priorityName
    this.indent = indent;
    this.checked = checked;
    this.isDeleted = is_deleted;
    this.projectId = project_id;
  }

  asMap () {
    return Map({
      content: this.content,
      date: this.date,
      priority: this.priority,
      indent: this.indent,
      checked: this.checked,
      isDeleted: this.isDeleted,
      projectId: this.projectId
    })
  }

  toHabiticaTodo () {
    return new Habitica.Todo(this.content, {
      priority: Habitica.priorities.toObject()[this.priority]
    })
  }
}

const priorities = Map({
  trivial: 1,
  easy: 2,
  medium: 3,
  hard: 4
})

module.exports = {
  Item: Item,
  priorities: priorities
}