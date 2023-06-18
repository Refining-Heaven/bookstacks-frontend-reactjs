import { PATH } from '../utils';

// Layouts
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import NotFound from '../containers/pages/NotFound'
import Login from '../containers/Auth/Login';
import SignUp from "../containers/Auth/SignUp";
import Home from '../containers/pages/Home'
import ManageBook from "../containers/pages/ManageBook";
import ManageChapter from "../containers/pages/ManageChapter";
import ManageAccount from "../containers/pages/ManageAccount";
import BookDetail from "../containers/pages/BookDetail";
import BooksFound from "../containers/pages/BooksFound";
import ChapterContent from "../containers/pages/ChapterContent";
import AccountInfo from "../containers/pages/AccountInfo/AccountInfo";

const guestRoutes = [
	{ path: PATH.UNDEFINED, page: NotFound, layout: null },
	{ path: PATH.LOGIN, page: Login, layout: null },
	{ path: PATH.SIGN_UP, page: SignUp, layout: null },
	{ path: PATH.HOME, page: Home, layout: DefaultLayout },
	{ path: PATH.BOOK_DETAIL, page: BookDetail, layout: DefaultLayout },
	{ path: PATH.BOOK_FOUND, page: BooksFound, layout: DefaultLayout },
	{ path: PATH.CHAPTER_CONTENT, page: ChapterContent, layout: DefaultLayout },
];

const userRoutes = [
	...guestRoutes,
	{ path: PATH.ACCOUNT_INFO, page: AccountInfo, layout: DefaultLayout },
];

const adminRoutes = [
	{ path: PATH.UNDEFINED, page: NotFound, layout: null },
	{ path: PATH.LOGIN, page: Login, layout: null },
	{ path: PATH.SIGN_UP, page: SignUp, layout: null },
	{ path: PATH.HOME, page: Home, layout: AdminLayout },
	{ path: PATH.BOOK_DETAIL, page: BookDetail, layout: AdminLayout },
	{ path: PATH.BOOK_FOUND, page: BooksFound, layout: AdminLayout },
	{ path: PATH.CHAPTER_CONTENT, page: ChapterContent, layout: AdminLayout },
	{ path: PATH.ACCOUNT_INFO, page: AccountInfo, layout: AdminLayout },
	{ path: PATH.MANAGE_BOOK, page: ManageBook, layout: AdminLayout },
	{ path: PATH.MANAGE_CHAPTER, page: ManageChapter, layout: AdminLayout },
	{ path: PATH.MANAGE_ACCOUNT, page: ManageAccount, layout: AdminLayout },
];

export { guestRoutes, userRoutes, adminRoutes };
