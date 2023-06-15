import { combineReducers } from 'redux';

import appReducer from './appReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
	storage: storage,
	stateReconciler: autoMergeLevel2,
};

const adminPersistConfig = {
	...persistCommonConfig,
	key: 'admin',
	whitelist: ['isLoggedIn', 'adminInfo'],
};

const userPersistConfig = {
	...persistCommonConfig,
	key: 'user',
	whitelist: ['isLoggedIn', 'accountInfo'],
};

const appPersistConfig = {
	...persistCommonConfig,
	key: 'app',
	whitelist: ['language'],
};

const rootReducer = combineReducers({
	admin: persistReducer(adminPersistConfig, adminReducer),
	user: persistReducer(userPersistConfig, userReducer),
	app: persistReducer(appPersistConfig, appReducer),
});

export default rootReducer;
