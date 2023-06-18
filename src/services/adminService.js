import axios from '../config/axios';

const addNewBookService = (data) => {
  return axios.post('/api/add-new-book', data);
}

const updateBookInfoService = (data) => {
  return axios.put('/api/update-book-info', data);
}

const deleteBookService = (bookId) => {
  return axios.delete('/api/delete-book', {data: {id: bookId}});
}

const addNewChapterService = (data) => {
  return axios.post('/api/add-new-chapter', data);
}

const updateChapterInfoService = (data) => {
  return axios.put('/api/update-chapter-info', data);
}

const deleteChapterService = (chapterId) => {
  return axios.delete('/api/delete-chapter', {data: {id: chapterId}});
}

const changeAccountInfoService = (data) => {
  return axios.put('/api/change-account-info', data);
}

const resetAccountPasswordService = (data) => {
  return axios.put('/api/reset-account-password', data);
}

const deleteAccountService = (userId) => {
  return axios.delete('/api/delete-account', {data: {id: userId}});
}

export {
  addNewBookService,
  updateBookInfoService,
  deleteBookService,
  addNewChapterService,
  updateChapterInfoService,
  deleteChapterService,
  changeAccountInfoService,
  resetAccountPasswordService,
  deleteAccountService
}