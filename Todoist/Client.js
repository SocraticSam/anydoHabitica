const axios = require('axios/index');
const { List } = require('immutable');
const { Item } = require('./Item');

class Client {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.url = 'https://todoist.com/api/v7';
  }

  items () {
    return axios({
      method: 'post',
      url: this.url + '/sync',
      data: {
        token: this.apiKey,
        sync_token: '*',
        resource_types: '["items"]'
      }
    })
      .then(response => {
        return List(response.data.items)
      })
      .then(items => items.map((item) => new Item(item)))
  }
}

module.exports = {
  Client: Client
}
