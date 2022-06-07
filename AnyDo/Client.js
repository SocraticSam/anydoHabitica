const Api = require('anydo-api')
const { List } = require('immutable');
const { Task } = require('./Task');

class Client {
  constructor (email, password, { ignoreListIds }) {
    this.api = new Api(email, password);
    this.ignoreListIds = ignoreListIds || List();
  }

  tasks () {
    return this.api.sync({ includeDone: true, includeDeleted: true })
      .then((response) =>  {
        return List(response.models.task.items)
          .filter((item) => item.parentGlobalTaskId == null)
          .filter((item) => ! this.ignoreListIds.includes(item.categoryId))
          .map(item => {
            return new Task(item.id, item);
          } )
      })
  }
}



module.exports = {
  Client: Client
}
