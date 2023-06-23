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

const getAllBookByKindService = (kindId, limit) => {
	return axios.get(`/api/get-all-book-by-kind?id=${kindId}&limit=${limit}`);
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
	getAllKindService,
	getAllCodeService,
	getAllBookService,
	getAllNewBookService,
	getAllBookByNameService,
	getAllBookByGenreService,
	getAllBookByKindService,
	getBookInfoService,
	getAllChapterService,
	getChapterInfoService,
	getAllAccountService,
	getAllCommentService,
	getAllReplyService
};
