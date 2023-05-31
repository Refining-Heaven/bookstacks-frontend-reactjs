import { toast } from 'react-toastify';
import actionTypes from './actionTypes';
import { createUserService, userLoginService } from '../../services/userService';

const handleCreateUser = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await createUserService(data);
			if (response && response.data.errCode === 0) {
				dispatch(handleCreateUserSucceed());
				window.location.replace("/login")
			} else {
				toast.warning(response.data.errMessage);
				dispatch(handleCreateUserFailed());
			}
		} catch (e) {
			toast.error('Error from server!');
			dispatch(handleCreateUserFailed());
			console.log(e);
		}
	};
};

const handleCreateUserSucceed = () => ({
	type: actionTypes.USER_SIGN_UP_SUCCEED,
});

const handleCreateUserFailed = () => ({
	type: actionTypes.USER_SIGN_UP_FAILED,
});

const handleUserLogin = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await userLoginService(data);
			if (response && response.data.errCode === 0) {
				dispatch(handleUserLoginSucceed(response.data.data));
				window.location.replace("/")
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

const handleUserLoginSucceed = (userInfo) => ({
	type: actionTypes.USER_LOGIN_SUCCEED,
	userInfo: userInfo
});

const handleUserLoginFailed = () => ({
	type: actionTypes.USER_LOGIN_FAILED,
});

const handleUserLogout = () => ({
	type: actionTypes.USER_LOGOUT,
});

export {
	handleCreateUser,
	handleUserLogin,
	handleUserLogout
};
