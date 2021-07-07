import axios from 'axios';

const Axios = axios.create({
  // baseURL: 'https://api.picspy.vagahbond.com',
  baseURL: process.env.REACT_APP_API_EXTERNAL_PORT
    ? `${process.env.REACT_APP_API_EXTERNAL_HOST}:${process.env.REACT_APP_API_EXTERNAL_PORT}`
    : process.env.REACT_APP_API_EXTERNAL_HOST,
});

export default Axios;
