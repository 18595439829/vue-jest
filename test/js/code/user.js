import axios from 'axios';

class Users {
  static get() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;