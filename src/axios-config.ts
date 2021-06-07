import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://api.picspy.vagahbond.com',
});

export default Axios;
