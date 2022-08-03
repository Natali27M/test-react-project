import {configureStore, combineReducers} from "@reduxjs/toolkit";
import postSliceReducer from "./post.slice";
import userSliceReducer from "./user.slice";
import authSliceReducer from "./auth.slice";
import commentSliceReducer from "./comment.slice";

const rootReducer = combineReducers({
    posts: postSliceReducer,
    users: userSliceReducer,
    comment: commentSliceReducer,
    auth: authSliceReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore["dispatch"];
