import axios from '../config/axios';

const getAllGenreService = () => {
	return axios.get('/api/get-all-genre');
};

const getAllCodeService = (type) => {
	return axios.get(`/api/get-all-code?type=${type}`);
};

const getAllBookService = () => {
	return axios.get('/api/get-all-book');
};

const getAllNewBookService = (limit) => {
	return axios.get(`/api/get-all-new-book?limit=${limit}`);
};

const getAllBookByNameService = (name) => {
	return axios.get(`/api/get-all-book-by-name?name=${name}`);
};

const getAllBookByGenreService = (genreId, limit) => {
	return axios.get(`/api/get-all-book-by-genre?id=${genreId}&limit=${limit}`);
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

const getAllCommentService = (id, type) => {
	return axios.get(`/api/get-all-comment?id=${id}&type=${type}`);
};

const getAllReplyService = (commentId) => {
	return axios.get(`/api/get-all-reply?id=${commentId}`);
};

export {
	getAllGenreService,
	getAllCodeService,
	getAllBookService,
	getAllNewBookService,
	getAllBookByNameService,
	getAllBookByGenreService,
	getBookInfoService,
	getAllChapterService,
	getChapterInfoService,
	getAllAccountService,
	getAllCommentService,
	getAllReplyService
};
