import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import { userService} from "../services";
import {IActionFulledUsers, IStateUser} from "../interfaces";

export const getAllUsers = createAsyncThunk(
    "userSlice/getAllUsers",

    async () => {
        try {
            const users = await userService.getAll();

            return {users: users.data};

        } catch (e){
            console.log(e);
        }
    }
);

const initialState: IStateUser = {
    users: [],
    status:null,
    error: null
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,

    reducers: {

    },

    extraReducers: {
        [getAllUsers.pending.type]: (state: Draft<IStateUser>) => {
            state.status = "pending";
            state.error = null;
        },
        [getAllUsers.fulfilled.type]: (state: Draft<IStateUser>, action: PayloadAction<IActionFulledUsers>) => {
            state.status = "fulfilled";
            state.users = action.payload.users;
        },
        [getAllUsers.rejected.type]: (state: Draft<IStateUser>, action: PayloadAction<string>) => {
            state.status = "reject";
            state.error = action.payload;
        }
    }
});

const userSliceReducer = userSlice.reducer;

export default userSliceReducer;
