import { FormattedMessage } from 'react-intl';

export const PATH = {
	UNDEFINED: '*',
	HOME: '/',
	LOGIN: '/login',
	SIGN_UP: '/sign-up',
	MANAGE: '/manage',
	MANAGE_BOOK: '/manage/book',
	MANAGE_CHAPTER: '/manage/chapter',
	MANAGE_ACCOUNT: '/manage/account',
	BOOK_DETAIL: '/book-detail/:name/id/:id',
	BOOK_FOUND: '/books-found/genre-id/:id',
	CHAPTER_CONTENT: '/book/:name/chapter/:number/id/:id',
	ACCOUNT_INFO: '/account/info'
};

export const TITLE = {
	HOME: <FormattedMessage id="title.home" />,
	LOGIN: 'Login',
	SIGN_UP: 'Sign up',
	MANAGE: 'Manage',
	MANAGE_BOOK: <FormattedMessage id="title.manage-book" />,
	MANAGE_CHAPTER: <FormattedMessage id="title.manage-chapter" />,
	MANAGE_ACCOUNT: <FormattedMessage id="title.manage-account" />,
	ACCOUNT_INFO: <FormattedMessage id="title.account-info" />
};

export const STATUS_TITLE = {
	NEW: <FormattedMessage id="book.status.new" />,
	UPDATE: <FormattedMessage id="book.status.lastest-update" />,
	ACCOMPLISHED: <FormattedMessage id="book.status.accomplished" />,
};

export const GENRE_ID = {
  ACTION: 1,
  ADVENTURE: 2,
  MYSTERY: 3,
  FANTASY: 4,
  DETECTIVE: 5,
  COMEDY: 6,
  TRAGEDY: 7,
  MARTIAL_ARTS: 8,
  DRAMA: 9,
  SUPERNATURAL: 10,
  FCI_FI: 11,
  MECHA: 12,
  HORROR: 13,
};

export const LANGUAGES = {
	VI: 'vi',
	EN: 'en',
};

export const THEMES = {
	LIGHT: 'light',
	DARK: 'dark',
};

export const ROLE = {
	ADMIN: 'A',
	USER: 'U'
}

export const ACTION = {
	CREATE: 'CREATE',
	UPDATE: 'UPDATE'
}

export const TYPE = {
	BOOK: 'BOOK',
	CHAPTER: 'CHAPTER',
	COMMENT: 'COMMENT',
	REPLY: 'REPLY'
}