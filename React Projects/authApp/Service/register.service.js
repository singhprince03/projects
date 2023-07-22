import axios from 'axios';

const registerService = (inputs) => {
  const url = `http://localhost:8000/api/register`;
  return axios.post(url, inputs);
};

export default registerService;
