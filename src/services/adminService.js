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

export {
  addNewBookService,
  updateBookInfoService,
  deleteBookService
}