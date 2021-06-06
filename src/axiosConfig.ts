import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.picspy.vagahbond.com',
});

export default instance;
