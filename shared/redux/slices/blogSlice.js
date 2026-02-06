import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogApi from '../../axios/blogApi';

const initialState = {
    items: [],
    adminItems: [],
    current: null,
    tags: [],
    total: 0,
    page: 1,
    status: 'idle',
    error: null,
};

export const fetchPublishedPosts = createAsyncThunk(
    'blog/fetchPublished',
    async ({ page = 1, tag = null } = {}, thunkApi) => {
        try {
            return await blogApi.fetchPublishedPosts(page, tag);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch posts');
        }
    }
);

export const fetchPostBySlug = createAsyncThunk(
    'blog/fetchBySlug',
    async (slug, thunkApi) => {
        try {
            return await blogApi.getPostBySlug(slug);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch post');
        }
    }
);

export const fetchAdminPosts = createAsyncThunk(
    'blog/fetchAdmin',
    async (_, thunkApi) => {
        try {
            return await blogApi.fetchAdminPosts();
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch admin posts');
        }
    }
);

export const fetchAdminPost = createAsyncThunk(
    'blog/fetchAdminPost',
    async (id, thunkApi) => {
        try {
            return await blogApi.getAdminPost(id);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch post');
        }
    }
);

export const createPost = createAsyncThunk(
    'blog/create',
    async (data, thunkApi) => {
        try {
            return await blogApi.createPost(data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to create post');
        }
    }
);

export const updatePost = createAsyncThunk(
    'blog/update',
    async ({ id, data }, thunkApi) => {
        try {
            return await blogApi.updatePost(id, data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to update post');
        }
    }
);

export const deletePost = createAsyncThunk(
    'blog/delete',
    async (id, thunkApi) => {
        try {
            await blogApi.deletePost(id);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to delete post');
        }
    }
);

export const publishPost = createAsyncThunk(
    'blog/publish',
    async (id, thunkApi) => {
        try {
            return await blogApi.publishPost(id);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to publish post');
        }
    }
);

export const unpublishPost = createAsyncThunk(
    'blog/unpublish',
    async (id, thunkApi) => {
        try {
            return await blogApi.unpublishPost(id);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to unpublish post');
        }
    }
);

export const fetchTags = createAsyncThunk(
    'blog/fetchTags',
    async (_, thunkApi) => {
        try {
            return await blogApi.fetchTags();
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch tags');
        }
    }
);

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        clearCurrentPost(state) {
            state.current = null;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch published
            .addCase(fetchPublishedPosts.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchPublishedPosts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload.posts;
                state.total = action.payload.total;
                state.page = action.payload.page;
            })
            .addCase(fetchPublishedPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Fetch by slug
            .addCase(fetchPostBySlug.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchPostBySlug.fulfilled, (state, action) => {
                state.status = 'idle';
                state.current = action.payload;
            })
            .addCase(fetchPostBySlug.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Admin posts
            .addCase(fetchAdminPosts.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchAdminPosts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.adminItems = action.payload;
            })
            .addCase(fetchAdminPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Admin single post
            .addCase(fetchAdminPost.fulfilled, (state, action) => {
                state.current = action.payload;
            })
            // Create
            .addCase(createPost.fulfilled, (state, action) => {
                state.adminItems.unshift(action.payload);
            })
            // Update
            .addCase(updatePost.fulfilled, (state, action) => {
                const idx = state.adminItems.findIndex(p => p.id === action.payload.id);
                if (idx !== -1) state.adminItems[idx] = action.payload;
                if (state.current?.id === action.payload.id) state.current = action.payload;
            })
            // Delete
            .addCase(deletePost.fulfilled, (state, action) => {
                state.adminItems = state.adminItems.filter(p => p.id !== action.payload);
            })
            // Publish
            .addCase(publishPost.fulfilled, (state, action) => {
                const idx = state.adminItems.findIndex(p => p.id === action.payload.id);
                if (idx !== -1) state.adminItems[idx] = action.payload;
            })
            // Unpublish
            .addCase(unpublishPost.fulfilled, (state, action) => {
                const idx = state.adminItems.findIndex(p => p.id === action.payload.id);
                if (idx !== -1) state.adminItems[idx] = action.payload;
            })
            // Tags
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags = action.payload;
            });
    },
});

export const { clearCurrentPost, clearError } = blogSlice.actions;
export default blogSlice.reducer;
