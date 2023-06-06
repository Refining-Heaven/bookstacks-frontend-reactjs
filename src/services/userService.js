import axios from '../config/axios';

const userSignUpService = (data) => {
  return axios.post('/api/sign-up', data);
}

const userLoginService = (data) => {
  return axios.post('/api/login', data);
}

export {
  userSignUpService,
  userLoginService
}