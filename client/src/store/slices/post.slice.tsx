import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

import { postService } from '../../services';
import { IActionFulledPosts, IPage, IStatePost } from '../../interfaces';

export const getAllPosts = createAsyncThunk(
    'postSlice/getAllPosts',

    async (payload:IPage) => {
        try {
            const posts = await postService.getAll(payload.page);

            return { posts: posts.data.data, data: posts.data };

        } catch (e){
            console.log(e);
        }
    }
);

const initialState: IStatePost = {
    posts: [],
    data:{ page:1 },
    status:null,
    error: null
};

const postSlice = createSlice({
    name: 'postSlice',
    initialState,

    reducers: {
        setPage: (state:Draft<IStatePost>, action: PayloadAction<IPage>) => {
            state.data.page = action.payload.page;
        }
    },

    extraReducers: {
        [getAllPosts.pending.type]: (state: Draft<IStatePost>) => {
            state.status = 'pending';
            state.error = null;
        },
        [getAllPosts.fulfilled.type]: (state: Draft<IStatePost>, action: PayloadAction<IActionFulledPosts>) => {
            state.status = 'fulfilled';
            state.posts = action.payload.posts;
            state.data = action.payload.data;
        },
        [getAllPosts.rejected.type]: (state: Draft<IStatePost>, action: PayloadAction<string>) => {
            state.status = 'reject';
            state.error = action.payload;
        }
    }
});

const postSliceReducer = postSlice.reducer;

export default postSliceReducer;

export const { setPage } = postSlice.actions;
