const actionTypes = Object.freeze({
	//app
	APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
	CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
	CHANGE_THEME: 'CHANGE_THEME',
	OPEN_MANAGE_BOOK_MODAL: 'OPEN_MANAGE_BOOK_MODAL',
	CLOSE_MANAGE_BOOK_MODAL: 'CLOSE_MANAGE_BOOK_MODAL',
	OPEN_MANAGE_CHAPTER_MODAL: 'OPEN_MANAGE_CHAPTER_MODAL',
	CLOSE_MANAGE_CHAPTER_MODAL: 'CLOSE_MANAGE_CHAPTER_MODAL',
	OPEN_CLOSE_OPTIONS_MENU: 'OPEN_CLOSE_OPTIONS_MENU',
	CLOSE_OPTIONS_MENU: 'CLOSE_OPTIONS_MENU',
	OPEN_SUB_OPTIONS_MENU: 'OPEN_SUB_OPTIONS_MENU',
	CLOSE_SUB_OPTIONS_MENU: 'CLOSE_SUB_OPTIONS_MENU',
	OPEN_UPDATE_ACCOUNT_INFO_MODAL: 'OPEN_UPDATE_ACCOUNT_INFO_MODAL',
	CLOSE_UPDATE_ACCOUNT_INFO_MODAL: 'CLOSE_UPDATE_ACCOUNT_INFO_MODAL',
	OPEN_CHANGE_PASSWORD_MODAL: 'OPEN_CHANGE_PASSWORD_MODAL',
	CLOSE_CHANGE_PASSWORD_MODAL: 'CLOSE_CHANGE_PASSWORD_MODAL',
	OPEN_COMMENT_SECTION: 'OPEN_COMMENT_SECTION',
	CLOSE_COMMENT_SECTION: 'CLOSE_COMMENT_SECTION',
	OPEN_CHAPTER_LIST_MODAL: 'OPEN_CHAPTER_LIST_MODAL',
	CLOSE_CHAPTER_LIST_MODAL: 'CLOSE_CHAPTER_LIST_MODAL',
	FETCH_REQUIRED_BOOK_DATA_START: 'FETCH_REQUIRED_BOOK_DATA_START',
	FETCH_REQUIRED_BOOK_DATA_SUCCEED: 'FETCH_REQUIRED_BOOK_DATA_SUCCEED',
	FETCH_REQUIRED_BOOK_DATA_FAILED: 'FETCH_REQUIRED_BOOK_DATA_FAILED',
	FETCH_ALL_BOOK_SUCCEED: 'FETCH_ALL_BOOK_SUCCEED',
	FETCH_ALL_BOOK_FAILED: 'FETCH_ALL_BOOK_FAILED',
	FETCH_ALL_NEW_BOOK_SUCCEED: 'FETCH_ALL_NEW_BOOK_SUCCEED',
	FETCH_ALL_NEW_BOOK_FAILED: 'FETCH_ALL_NEW_BOOK_FAILED',
	FETCH_ALL_BOOK_BY_NAME_SUCCEED: 'FETCH_ALL_BOOK_BY_NAME_SUCCEED',
	FETCH_ALL_BOOK_BY_NAME_FAILED: 'FETCH_ALL_BOOK_BY_NAME_FAILED',
	FETCH_ALL_BOOK_BY_GENRE_SUCCEED: 'FETCH_ALL_BOOK_BY_GENRE_SUCCEED',
	FETCH_ALL_BOOK_BY_GENRE_FAILED: 'FETCH_ALL_BOOK_BY_GENRE_FAILED',
	FETCH_BOOK_INFO_SUCCEED: 'FETCH_BOOK_INFO_SUCCEED',
	FETCH_BOOK_INFO_FAILED: 'FETCH_BOOK_INFO_FAILED',
	FETCH_ALL_CHAPTER_SUCCEED: 'FETCH_ALL_CHAPTER_SUCCEED',
	FETCH_ALL_CHAPTER_FAILED: 'FETCH_ALL_CHAPTER_FAILED',
	FETCH_CHAPTER_INFO_SUCCEED: 'FETCH_CHAPTER_INFO_SUCCEED',
	FETCH_CHAPTER_INFO_FAILED: 'FETCH_CHAPTER_INFO_FAILED',
	FETCH_ROLE_DATA_SUCCEED: 'FETCH_ROLE_DATA_SUCCEED',
	FETCH_ROLE_DATA_FAILED: 'FETCH_ROLE_DATA_FAILED',
	FETCH_ALL_ACCOUNT_SUCCEED: 'FETCH_ALL_ACCOUNT_SUCCEED',
	FETCH_ALL_ACCOUNT_FAILED: 'FETCH_ALL_ACCOUNT_FAILED',
	FETCH_SELECTED_ACCOUNT_INFO_SUCCEED: 'FETCH_SELECTED_ACCOUNT_INFO_SUCCEED',
	FETCH_SELECTED_ACCOUNT_INFO_FAILED: 'FETCH_SELECTED_ACCOUNT_INFO_FAILED',
	FETCH_ALL_COMMENT_SUCCEED: 'FETCH_ALL_COMMENT_SUCCEED',
	FETCH_ALL_COMMENT_FAILED: 'FETCH_ALL_COMMENT_FAILED',
	FETCH_ALL_REPLY_SUCCEED: 'FETCH_ALL_REPLY_SUCCEED',
	FETCH_ALL_REPLY_FAILED: 'FETCH_ALL_REPLY_FAILED',
	CLEAR_BOOKS_FOUND: 'CLEAR_BOOKS_FOUND',
	CLEAR_BOOK_INFO: 'CLEAR_BOOK_INFO',
	CLEAR_ALL_BOOK: 'CLEAR_ALL_BOOK',
	CLEAR_ALL_CHAPTER: 'CLEAR_ALL_CHAPTER',
	CLEAR_CHAPTER_INFO: 'CLEAR_CHAPTER_INFO',
	CLEAR_SELECTED_ACCOUNT_INFO: 'CLEAR_SELECTED_ACCOUNT_INFO',
	
	//user
	USER_SIGN_UP_SUCCEED: 'USER_SIGN_UP_SUCCEED',
	USER_SIGN_UP_FAILED: 'USER_SIGN_UP_FAILED',
	USER_LOGIN_SUCCEED: 'USER_LOGIN_SUCCEED',
	USER_LOGIN_FAILED: 'USER_LOGIN_FAILED',
	USER_LOGOUT: 'USER_LOGOUT',
	FETCH_ACCOUNT_INFO_SUCCEED: 'FETCH_ACCOUNT_INFO_SUCCEED',
	FETCH_ACCOUNT_INFO_FAILED: 'FETCH_ACCOUNT_INFO_FAILED',
	UPDATE_ACCOUNT_INFO_SUCCEED: 'UPDATE_ACCOUNT_INFO_SUCCEED',
	UPDATE_ACCOUNT_INFO_FAILED: 'UPDATE_ACCOUNT_INFO_FAILED',
	CHANGE_PASSWORD_SUCCEED: 'CHANGE_PASSWORD_SUCCEED',
	CHANGE_PASSWORD_FAILED: 'CHANGE_PASSWORD_FAILED',
	ADD_COMMENT_SUCCEED: 'ADD_COMMENT_SUCCEED',
	ADD_COMMENT_FAILED: 'ADD_COMMENT_FAILED',
	ADD_REPLY_SUCCEED: 'ADD_REPLY_SUCCEED',
	ADD_REPLY_FAILED: 'ADD_REPLY_FAILED',
	DELETE_COMMENT_SUCCEED: 'DELETE_COMMENT_SUCCEED',
	DELETE_COMMENT_FAILED: 'DELETE_COMMENT_FAILED',

	//admin
	ADD_NEW_BOOK_SUCCEED: 'ADD_NEW_BOOK_SUCCEED',
	ADD_NEW_BOOK_FAILED: 'ADD_NEW_BOOK_FAILED',
	UPDATE_BOOK_INFO_SUCCEED: 'UPDATE_BOOK_INFO_SUCCEED',
	UPDATE_BOOK_INFO_FAILED: 'UPDATE_BOOK_INFO_FAILED',
	DELETE_BOOK_SUCCEED: 'DELETE_BOOK_SUCCEED',
	DELETE_BOOK_FAILED: 'DELETE_BOOK_FAILED',
	ADD_NEW_CHAPTER_SUCCEED: 'ADD_NEW_CHAPTER_SUCCEED',
	ADD_NEW_CHAPTER_FAILED: 'ADD_NEW_CHAPTER_FAILED',
	UPDATE_CHAPTER_INFO_SUCCEED: 'UPDATE_CHAPTER_INFO_SUCCEED',
	UPDATE_CHAPTER_INFO_FAILED: 'UPDATE_CHAPTER_INFO_FAILED',
	DELETE_CHAPTER_SUCCEED: 'DELETE_CHAPTER_SUCCEED',
	DELETE_CHAPTER_FAILED: 'DELETE_CHAPTER_FAILED',
	CHANGE_ACCOUNT_INFO_SUCCEED: 'CHANGE_ACCOUNT_INFO_SUCCEED',
	CHANGE_ACCOUNT_INFO_FAILED: 'CHANGE_ACCOUNT_INFO_FAILED',
	RESET_ACCOUNT_PASSWORD_SUCCEED: 'RESET_ACCOUNT_PASSWORD_SUCCEED',
	RESET_ACCOUNT_PASSWORD_FAILED: 'RESET_ACCOUNT_PASSWORD_FAILED',
	DELETE_ACCOUNT_SUCCEED: 'DELETE_ACCOUNT_SUCCEED',
	DELETE_ACCOUNT_FAILED: 'DELETE_ACCOUNT_FAILED',
});

export default actionTypes;
