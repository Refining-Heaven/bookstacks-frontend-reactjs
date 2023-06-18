import axios from '../config/axios';

const getAllGenreService = () => {
	return axios.get('/api/get-all-genre');
};

const getAllKindService = () => {
	return axios.get('/api/get-all-kind');
};

const getAllCodeService = (type) => {
	return axios.get(`/api/get-all-code?type=${type}`);
};

const getAllBookService = () => {
	return axios.get('/api/get-all-book');
};

const getAllNewBookService = () => {
	return axios.get('/api/get-all-new-book');
};

const getAllBookByNameService = (name) => {
	return axios.get(`/api/get-all-book-by-name?name=${name}`);
};

const getAllBookByGenreService = (genreId) => {
	return axios.get(`/api/get-all-book-by-genre?id=${genreId}`);
};

const getBookInfoService = (bookId) => {
	return axios.get(`/api/get-book-info?id=${bookId}`);
};

const getAllChapterService = (bookId) => {
	return axios.get(`/api/get-all-chapter?id=${bookId}`);
};

const getChapterInfoService = (chapterId) => {
	return axios.get(`/api/get-chapter-info?id=${chapterId}`);
};

const getAllAccountService = () => {
	return axios.get('/api/get-all-account');
};

export {
	getAllGenreService,
	getAllKindService,
	getAllCodeService,
	getAllBookService,
	getAllNewBookService,
	getAllBookByNameService,
	getAllBookByGenreService,
	getBookInfoService,
	getAllChapterService,
	getChapterInfoService,
	getAllAccountService
};
