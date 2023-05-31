import { PATH } from '../utils';

// Layouts
import DefaultLayout from "../layouts/DefaultLayout";
// import ManageLayout from "../layouts/ManageLayout"

// Pages
import Login from '../containers/Auth/Login';
import SignUp from "../containers/Auth/SignUp/SignUp";
import Home from '../containers/pages/Home'
import ManageBook from "../containers/pages/Manage/ManageBook/ManageBook";

// Public routes
const publicRoutes = [
	{ path: PATH.LOGIN, page: Login, layout: null },
	{ path: PATH.SIGN_UP, page: SignUp, layout: null },
	{ path: PATH.HOME, page: Home, layout: DefaultLayout },

	{ path: PATH.MANAGE_BOOK, page: ManageBook, layout: DefaultLayout },

	// { path: config.routes.upload, page: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
