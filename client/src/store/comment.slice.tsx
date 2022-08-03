import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IComment, IStateComment} from "../interfaces";
import {commentService} from "../services";

// export const getAllPosts = createAsyncThunk(
//     "postSlice/getAllPosts",
//
//     async () => {
//         try {
//             const posts = await postService.getAll();
//
//             return {posts: posts.data};
//
//         } catch (e){
//             console.log(e);
//         }
//     }
// );

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
    name: "commentSlice",
    initialState,

    reducers: {
        addComment: (state, action) => {
            state.comments.push(action.payload.data);
        },
    },

    extraReducers: {

    }
});

const commentSliceReducer = commentSlice.reducer;

export const { addComment } = commentSlice.actions;

export default commentSliceReducer;
