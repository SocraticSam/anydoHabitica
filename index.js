const Dotenv = require('dotenv').config()
const Habitica = { ...require('./Habitica/Client'), ...require('./Habitica/Task') };
const AnyDo = { ...require('./AnyDo/Client' )}
const Todos = require('./Habitica/Todos')
Promise.Util = require('./Promise/Util')

const habiticaUserId = process.env.HABITICA_USER_ID
const habiticaApiToken = process.env.HABITICA_API_TOKEN
const anyDoEmail = process.env.ANYDO_EMAIL
const anyDoPassword = process.env.ANYDO_PASSWORD

const habitica =
  new Habitica.Client(habiticaApiToken, habiticaUserId)

const anyDo =
  new AnyDo.Client(anyDoEmail, anyDoPassword)

Promise.Util.map2(habitica.todos(), anyDo.tasks(), (habiticaTodos, anyDoTasks) => {
  return {
    habiticaTodos,
    anyDoTodos: anyDoTasks.map(task => task.toHabiticaTodo())
  }
}).then(({habiticaTodos, anyDoTodos}) => {
  return {
    todosToCreate: Todos.toCreate(habiticaTodos, anyDoTodos),
    todosToCompleteOrIncomplete: Todos.toCompleteOrIncomplete(habiticaTodos, anyDoTodos),
    todosToUpdate: Todos.toUpdate(habiticaTodos, anyDoTodos)
  }
}).then(({ todosToCreate, todosToCompleteOrIncomplete, todosToUpdate }) =>
  Promise.all(
    todosToCreate.map((todo) => habitica.newTodo(todo) ).toArray()
      .concat(todosToCompleteOrIncomplete.map((todo) => {
        if (todo.completed === true) {
          return habitica.incomplete(todo)
        } else if (todo.completed === false) {
          return habitica.complete(todo)
        }
      }).toArray() )
      .concat(todosToUpdate.map((todo) => habitica.update(todo)).toArray())
  )
).catch(error =>
  //console.log(error.response.data)
  console.log(error)
)

