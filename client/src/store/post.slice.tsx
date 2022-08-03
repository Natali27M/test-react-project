import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {postService} from "../services";
import {IActionFulledPosts,IStatePost} from "../interfaces";

export const getAllPosts = createAsyncThunk(
    "postSlice/getAllPosts",

    async () => {
        try {
            const posts = await postService.getAll();

            return {posts: posts.data};

        } catch (e){
            console.log(e);
        }
    }
);

const initialState: IStatePost = {
    posts: [],
    status:null,
    error: null
};

const postSlice = createSlice({
    name: "postSlice",
    initialState,

    reducers: {

    },

    extraReducers: {
        [getAllPosts.pending.type]: (state: Draft<IStatePost>) => {
            state.status = "pending";
            state.error = null;
        },
        [getAllPosts.fulfilled.type]: (state: Draft<IStatePost>, action: PayloadAction<IActionFulledPosts>) => {
            state.status = "fulfilled";
            state.posts = action.payload.posts;
        },
        [getAllPosts.rejected.type]: (state: Draft<IStatePost>, action: PayloadAction<string>) => {
            state.status = "reject";
            state.error = action.payload;
        }
    }
});

const postSliceReducer = postSlice.reducer;

export default postSliceReducer;
