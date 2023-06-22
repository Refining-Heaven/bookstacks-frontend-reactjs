import axios from '../config/axios';

const userSignUpService = (data) => {
  return axios.post('/api/sign-up', data);
}

const userLoginService = (data) => {
  return axios.post('/api/login', data);
}

const getAccountInfoService = (userId) => {
	return axios.get(`/api/get-account-info?id=${userId}`);
};

const updateAccountInfoService = (data) => {
  return axios.put('/api/update-account-info', data);
}

const changePasswordService = (data) => {
  return axios.put('/api/change-password', data);
}

const addCommentService = (data) => {
  return axios.post('/api/add-comment', data);
}

const addReplyService = (data) => {
  return axios.post('/api/add-reply', data);
}

const deleteCommentService = (id, type) => {
	return axios.delete(`/api/delete-comment?id=${id}&type=${type}`);
};

export {
  userSignUpService,
  userLoginService,
  updateAccountInfoService,
  getAccountInfoService,
  changePasswordService,
  addCommentService,
  addReplyService,
  deleteCommentService
}