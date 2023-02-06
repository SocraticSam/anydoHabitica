const { DateTime } = require('luxon')
const { Map } = require('immutable')
const Habitica = require('../Habitica/Task')

class Task {
  constructor(id, {priority, repeatingMethod, note, title, subTasks, categoryId, dueDate, status}) {
    const priorityName =
      Object.keys(priorities.toObject())
        .find((key) => {
          return priorities.toObject()[key] === priority
        })


    this.dueDate = null;
    if (dueDate != null)
    {
      this.dueDate = DateTime.fromMillis(dueDate);
    }

    this.priority = priorityName;
    this.note = note;
    this.title = title;
    this.subTasks = subTasks;
    this.categoryId = categoryId; 
    this.status = status;
    this.id = id;
    this.repeatingMethod = repeatingMethod;
  }

  asMap () {
    return Map({
      priority: this.priority,
      title: this.title,
      note: this.note,
      subTasks: this.subTasks,
      categoryId: this.categoryId,
      dueDate: this.dueDate,
      status: this.status,
      id: this.id,
      repeatingMethod: this.repeatingMethod
    })
  }

  isCompleted () {
    if (this.status === "CHECKED") return true
    if (this.status === "DONE") return true
    if (this.status === "UNCHECKED") return false 
    return false;
  }
  
  equalsHabiticaTodo (hTodo) {
    const thisAlias = this.id.replace(/\W/g, '');
    return thisAlias == hTodo.alias; 
  }

  toHabiticaTodo () {
    const type = this.repeatingMethod === 'TASK_REPEAT_OFF'
      || this.repeatingMethod == null ? 'todo' : 'daily'

    const frequency = (() => {
      switch (this.repeatingMethod) {
        case 'TASK_REPEAT_DAY': return 'daily';
        case 'TASK_REPEAT_WEEKLY': return 'weekly';
        case 'TASK_REPEAT_MONTH': return 'monthly';
        case 'TASK_REPEAT_YEAR': return 'yearly';
        default: return 'weekly';
      }
    })();

    return new Habitica.Todo(this.title, type, {
      completed: this.isCompleted(),
      date: this.getDueDateString(),
      alias: this.id.replace(/\W/g, ''),
      notes: this.note,
      priority: Habitica.priorities.toObject()[this.priority],
      frequency: frequency
    })
  }

  getDueDateString () {
    if (this.dueDate) return this.dueDate.toJSDate().toISOString();
    return null;
  }
}

const priorities = Map({
  easy: 'Normal',
  hard: 'High'
})

module.exports = {
  Task: Task,
  priorities: priorities
}