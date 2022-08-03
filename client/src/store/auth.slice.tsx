import {
    createAsyncThunk, createSlice, Draft, PayloadAction,
} from '@reduxjs/toolkit';

import { authService } from "../services";
import {IStateAuth, IUser, IUserLoginData} from "../interfaces";

const initialState: IStateAuth = {
    user: null,
    status: null,
    error: null,
};

export const createNewUser = createAsyncThunk(
    'authSlice/createNewUser',
    async (user: IUser) => {
        try {
            const newUser: IUser = await authService.signUp(user);
            return { newUser };
        } catch (e) {
            return e;
        }
    },
);

export const loginNewUser = createAsyncThunk(
    'authSlice/loginNewUser',
    async (userLoginData: IUserLoginData) => {
        try {
            const newUser: IUser = await authService.login(userLoginData);
            return { newUser };
        } catch (e) {
            return e;
        }
    },
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.newUser;
        },
    },

    extraReducers: {
        [createNewUser.pending.type]:
            (state: Draft<IStateAuth>) => {
                state.status = 'pending';
                state.error = null;
            },
        [createNewUser.fulfilled.type]:
            (state: Draft<IStateAuth>, action) => {
                state.status = 'fulfilled';
                state.user = action.payload.newUser;
            },
        [createNewUser.rejected.type]:
            (state: Draft<IStateAuth>, action: PayloadAction<string>) => {
                state.status = 'reject';
                state.error = action.payload;
            },

        [loginNewUser.pending.type]:
            (state: Draft<IStateAuth>) => {
                state.status = 'pending';
                state.error = null;
            },
        [loginNewUser.fulfilled.type]:
            (state: Draft<IStateAuth>, action) => {
                state.status = 'fulfilled';
                state.user = action.payload.newUser;
            },
        [loginNewUser.rejected.type]:
            (state: Draft<IStateAuth>, action: PayloadAction<string>) => {
                state.status = 'reject';
                state.error = action.payload;
            }
    },
});

const authSliceReducer = authSlice.reducer;

export default authSliceReducer;
