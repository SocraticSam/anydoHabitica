const { Map } = require('immutable')

class Task {
  constructor (text, type, { frequency, alias, attribute, notes, date, priority, reminders, id, completed }) {
    this.text = text;
    this.alias = alias || undefined;
    this.attribute = attribute || undefined;
    this.id = id || undefined;
    this.notes = notes || "";
    this.date = date || undefined;
    this.priority = priority || undefined;
    this.reminders = reminders || undefined;
    this.completed = completed;
    this.type = type;
    this.frequency = frequency;
  }

  asMap () {
    return Map({
      text: this.text,
      alias: this.alias,
      attribute: this.attribute,
      notes: this.notes,
      date: this.date,
      priority: this.priority,
      reminders: this.reminders,
      id: this.id,
      completed: this.completed,
      type: this.type,
      frequency: this.frequency
    })
  }
}

const priorities = Map({
  trivial: 0.1,
  easy: 1,
  medium: 1.5,
  hard: 2
})

module.exports = { Todo: Task, priorities: priorities }