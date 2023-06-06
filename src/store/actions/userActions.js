import { toast } from 'react-toastify';
import actionTypes from './actionTypes';
import { userSignUpService, userLoginService } from '../../services/userService';

const handleUserSignUp = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await userSignUpService(data);
			if (response && response.data.errCode === 0) {
				toast.success(response.data.errMessage);
				dispatch(handleUserSignUpSucceed());
				setTimeout(() => {
					window.location.replace("/login")
				}, 3000)
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
	handleUserSignUp,
	handleUserLogin,
	handleUserLogout
};
