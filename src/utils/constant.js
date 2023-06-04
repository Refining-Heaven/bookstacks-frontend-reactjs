import { FormattedMessage } from 'react-intl';

export const PATH = {
	HOME: '/',
	LOGIN: '/login',
	SIGN_UP: '/sign-up',
	MANAGE: '/manage',
	MANAGE_BOOK: '/manage/book',
	BOOK_DETAIL: '/book-detail/:id',
	BOOK_FOUND: '/books-found/genre-id/:id',
};

export const TITLE = {
	HOME: <FormattedMessage id="title.home" />,
	LOGIN: 'Login',
	SIGN_UP: 'Sign up',
	MANAGE: 'Manage',
	MANAGE_BOOK: <FormattedMessage id="title.manage-book" />,
};

export const STATUS_TITLE = {
	NEW: <FormattedMessage id="book.status.new" />,
	ACCOMPLISHED: <FormattedMessage id="book.status.accomplished" />,
};

export const GENRE_TITLE = {
  ACTION: <FormattedMessage id="book.genre.action" />,
};

export const KIND_TITLE = {
  ALLEGORY: <FormattedMessage id="book.kind.allegory" />,
  NOVEL: <FormattedMessage id="book.kind.novel" />,
  SHORT_STORY: <FormattedMessage id="book.kind.short-story" />,
};

export const LANGUAGES = {
	VI: 'vi',
	EN: 'en',
};

export const THEMES = {
	LIGHT: 'light',
	DARK: 'dark',
};
