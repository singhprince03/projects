import axios from 'axios';

const loginService = (inputs) => {
  const url = `http://localhost:8000/api/login`;
  return axios.post(url, inputs);
};

export default loginService;
