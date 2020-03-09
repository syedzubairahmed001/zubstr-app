import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        common: {        // can be common or any other method
          'x-access-token': localStorage.getItem('a-id') || '',
          'x-refresh-token': localStorage.getItem('r-id') || ''
        }
      }
});
console.log('api-url', process.env.REACT_APP_API_URL);

export default instance;