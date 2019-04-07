const Api = require('anydo-api')
const { List } = require('immutable');
const { Task } = require('./Task');

class Client {
  constructor (email, password) {
    this.api = new Api(email, password)
  }

  tasks () {
    return this.api.sync({ includeDone: true, includeDeleted: true })
      .then((response) =>  {
        return List(response.models.task.items)
          .filter((item) => item.parentGlobalTaskId == null)
          .map(item => new Task(item.id, item))
      })
  }
}



module.exports = {
  Client: Client
}
