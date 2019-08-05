import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://politico034.herokuapp.com/api/v1',
  headers: {
    'x-auth': localStorage.getItem('politicoToken'),
  },
});

export default instance;
