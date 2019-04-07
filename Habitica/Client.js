const axios = require('axios/index');
const { List } = require('immutable');
const { Todo } = require('./Task');
Promise.Util = require('../Promise/Util')

class Client {
  constructor(apiKey, userId) {
    this.axios = axios.create({
      baseURL: 'https://habitica.com/api/v3',
      timeout: 20000,
      headers: {
        'x-api-user': userId,
        'x-api-key': apiKey
      }
    })
  }

  todos () {
    return Promise.Util.map2(this.axios({
      method: 'get',
      url: '/tasks/user',
    }), this.axios ({
      method: 'get',
      url: 'https://habitica.com/api/v3/tasks/user?type=completedTodos'
    }), ((incompleteTasksResponse, completedTodosResponse) =>
        incompleteTasksResponse.data.data.concat(
          completedTodosResponse.data.data
        )
    )).then(data => {
        return List(data)
          .filter(t => t.type === 'todo')
          .map((task) => { return new Todo(task.text, task.type, task) })
      })
  }

  newTodo (todo) {
    return this.axios({
      method: 'post',
      url: '/tasks/user',
      data: todo.asMap().toJS()
    })
  }

  update (todo) {
    return this.axios({
      method: 'put',
      url: '/tasks/' + todo.alias,
      data: todo.asMap().toJS()
    })
  }

  complete (todo) {
    return this.axios({
      method: 'post',
      url: '/tasks/' + todo.alias + '/score/up'
    })
  }

  incomplete (todo) {
    return this.axios({
      method: 'post',
      url: '/tasks/' + todo.id + '/score/down'
    })
  }
}

module.exports = {
  Client: Client
}
