import axios from '../config/axios';

const createUserService = (data) => {
  return axios.post('/api/sign-up', data);
}

const userLoginService = (data) => {
  return axios.post('/api/login', data);
}

export {
  createUserService,
  userLoginService
}