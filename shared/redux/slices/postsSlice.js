import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        createPost(state, action) {
            state.push(action.payload);
        }
    }
})


export const {createPost} = postsSlice.actions;

export default postsSlice.reducer;