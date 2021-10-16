import axios from 'axios';

const Axios = axios.create({
  baseURL: `${
    process.env.REACT_APP_API_EXTERNAL_HOST
      ? process.env.REACT_APP_API_EXTERNAL_HOST
      : `https://picspy-api.herokuapp.com`
    }${
    process.env.REACT_APP_API_EXTERNAL_PORT
      ? `:${process.env.REACT_APP_API_EXTERNAL_PORT}`
      : ''
    }`,
});

export default Axios;
