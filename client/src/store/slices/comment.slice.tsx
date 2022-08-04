import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

import { IActionFulledComments, IComment, IStateComment } from '../../interfaces';
import { commentService } from "../../services";

export const getAllComments = createAsyncThunk(
    'commentSlice/getAllComments',

    async () => {
        try {
            const comments = await commentService.getAll();

            return {comments: comments.data};

        } catch (e){
            console.log(e);
        }
    }
);

export const createComment = createAsyncThunk<void, IComment>(
    'commentSlice/createComment',
    async (comment, { dispatch }) => {
        try {
            const newComment = await commentService.create(comment);
            dispatch(addComment({ data: newComment }));
        } catch (e) {
            console.log(e);
        }
    },
);


const initialState: IStateComment = {
    comments: [],
    status:null,
    error: null
};

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,

    reducers: {
        addComment: (state, action) => {
            state.comments.push(action.payload.data);
        },
    },

    extraReducers: {
        [getAllComments.pending.type]: (state: Draft<IStateComment>) => {
            state.status = 'pending';
            state.error = null;
        },
        [getAllComments.fulfilled.type]: (state: Draft<IStateComment>, action: PayloadAction<IActionFulledComments>) => {
            state.status = 'fulfilled';
            state.comments = action.payload.comments;
        },
        [getAllComments.rejected.type]: (state: Draft<IStateComment>, action: PayloadAction<string>) => {
            state.status = 'reject';
            state.error = action.payload;
        }
    }
});

const commentSliceReducer = commentSlice.reducer;

export const { addComment } = commentSlice.actions;

export default commentSliceReducer;
