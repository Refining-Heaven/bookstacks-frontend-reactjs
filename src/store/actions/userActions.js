import { toast } from 'react-toastify';
import actionTypes from './actionTypes';
import * as actions from '../actions'
import * as services from '../../services/userService';

const handleUserSignUp = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.userSignUpService(data);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleUserSignUpSucceed());
				setTimeout(() => {
					window.location.replace('/login');
				}, 3000);
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleUserSignUpFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleUserSignUpFailed());
			console.log(e);
		}
	};
};

const handleUserSignUpSucceed = () => ({
	type: actionTypes.USER_SIGN_UP_SUCCEED,
});

const handleUserSignUpFailed = () => ({
	type: actionTypes.USER_SIGN_UP_FAILED,
});

const handleUserLogin = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.userLoginService(data);
			if (response && response.data.errCode === 0) {
				dispatch(handleUserLoginSucceed(response.data.data));
				window.location.replace('/');
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleUserLoginFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleUserLoginFailed());
			console.log(e);
		}
	};
};

const handleUserLoginSucceed = (accountInfo) => ({
	type: actionTypes.USER_LOGIN_SUCCEED,
	accountInfo: accountInfo,
});

const handleUserLoginFailed = () => ({
	type: actionTypes.USER_LOGIN_FAILED,
});

//
const handleUserLogout = () => ({
	type: actionTypes.USER_LOGOUT,
});

// Fetch account info
export const fetchAccountInfo = (userId) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.getAccountInfoService(userId);
			if (response && response.data.errCode === 0) {
				dispatch(fetchAccountInfoSucceed(response.data.data));
			} else {
				dispatch(fetchAccountInfoFailed());
			}
		} catch (e) {
			dispatch(fetchAccountInfoFailed());
			console.log(e);
		}
	};
};
const fetchAccountInfoSucceed = (data) => ({
	type: actionTypes.FETCH_ACCOUNT_INFO_SUCCEED,
	accountInfo: data,
});
const fetchAccountInfoFailed = () => ({
	type: actionTypes.FETCH_ACCOUNT_INFO_FAILED,
});

// Update account info
export const handleUpdateAccountInfo = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.updateAccountInfoService(data);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleUpdateAccountInfoSucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleUpdateAccountInfoFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleUpdateAccountInfoFailed());
			console.log(e);
		}
	}
};
const handleUpdateAccountInfoSucceed = () => ({
	type: actionTypes.UPDATE_ACCOUNT_INFO_SUCCEED,
});
const handleUpdateAccountInfoFailed = () => ({
	type: actionTypes.UPDATE_ACCOUNT_INFO_FAILED,
});

// Change password
export const handleChangePassword = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.changePasswordService(data);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleChangePasswordSucceed());
				dispatch(actions.handleCloseChangePasswordModal())
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleChangePasswordFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleChangePasswordFailed());
			console.log(e);
		}
	}
};
const handleChangePasswordSucceed = () => ({
	type: actionTypes.CHANGE_PASSWORD_SUCCEED,
});
const handleChangePasswordFailed = () => ({
	type: actionTypes.CHANGE_PASSWORD_FAILED,
});

// Add comment
export const handleAddComment = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.addCommentService(data);
			if (response && response.data.errCode === 0) {
				dispatch(handleAddCommentSucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleAddCommentFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleAddCommentFailed());
			console.log(e);
		}
	}
};
const handleAddCommentSucceed = () => ({
	type: actionTypes.ADD_COMMENT_SUCCEED,
});
const handleAddCommentFailed = () => ({
	type: actionTypes.ADD_COMMENT_FAILED,
});

// Add reply
export const handleAddReply = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.addReplyService(data);
			if (response && response.data.errCode === 0) {
				dispatch(handleAddReplySucceed());
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleAddReplyFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleAddReplyFailed());
			console.log(e);
		}
	}
};
const handleAddReplySucceed = () => ({
	type: actionTypes.ADD_REPLY_SUCCEED,
});
const handleAddReplyFailed = () => ({
	type: actionTypes.ADD_REPLY_FAILED,
});

// Delete comment
export const handleDeleteComment = (id, type) => {
	return async (dispatch, getState) => {
		try {
			const response = await services.deleteCommentService(id, type);
			if (response && response.data.errCode === 0) {
				dispatch(handleDeleteCommentSucceed(response.data.data));
			} else {
				dispatch(handleDeleteCommentFailed());
			}
		} catch (e) {
			dispatch(handleDeleteCommentFailed());
			console.log(e);
		}
	};
};
const handleDeleteCommentSucceed = () => ({
	type: actionTypes.DELETE_COMMENT_SUCCEED,
});
const handleDeleteCommentFailed = () => ({
	type: actionTypes.DELETE_COMMENT_FAILED,
});


export { handleUserSignUp, handleUserLogin, handleUserLogout };
