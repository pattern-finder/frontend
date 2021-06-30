import axios from 'axios';

const Axios = axios.create({
  // baseURL: 'https://api.picspy.vagahbond.com',
  baseURL: 'http://localhost:3031',
});

export default Axios;
