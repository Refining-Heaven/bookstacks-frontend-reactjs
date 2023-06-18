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

export { handleUserSignUp, handleUserLogin, handleUserLogout };
