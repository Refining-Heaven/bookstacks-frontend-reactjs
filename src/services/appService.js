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
	return axios.get(`/api/get-all-book-by-genre?genreId=${genreId}`);
};

const getBookInfoByIdService = (bookId) => {
	return axios.get(`/api/get-book-info-by-id?id=${bookId}`);
};

export {
	getAllGenreService,
	getAllKindService,
	getAllCodeService,
	getAllBookService,
	getAllNewBookService,
	getAllBookByNameService,
	getAllBookByGenreService,
	getBookInfoByIdService,
};
