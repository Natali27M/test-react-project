import { configureStore, combineReducers } from '@reduxjs/toolkit';

import postSliceReducer from './slices/post.slice';
import userSliceReducer from './slices/user.slice';
import commentSliceReducer from './slices/comment.slice';
import authSliceReducer from './slices/auth.slice';

const rootReducer = combineReducers({
    posts: postSliceReducer,
    users: userSliceReducer,
    comments: commentSliceReducer,
    auth: authSliceReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
