import axios from 'axios';

const Axios = axios.create({
  baseURL: `${
    process.env.REACT_APP_API_EXTERNAL_HOST
      ? process.env.REACT_APP_API_EXTERNAL_HOST
      : `http://34.79.103.41`
  }${
    process.env.REACT_APP_API_EXTERNAL_PORT
      ? `:${process.env.REACT_APP_API_EXTERNAL_PORT}`
      : ''
  }`,
});

export default Axios;
