import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import workApi from '../../axios/workApi';

const initialState = {
    experiences: [],
    current: null,
    timeline: [],
    featuredPosts: [],
    status: 'idle',
    error: null,
};

export const fetchExperiences = createAsyncThunk(
    'work/fetchExperiences',
    async (_, thunkApi) => {
        try {
            return await workApi.fetchExperiences();
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch experiences');
        }
    }
);

export const fetchExperience = createAsyncThunk(
    'work/fetchExperience',
    async (slug, thunkApi) => {
        try {
            return await workApi.fetchExperience(slug);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch experience');
        }
    }
);

export const fetchAdminExperiences = createAsyncThunk(
    'work/fetchAdminExperiences',
    async (_, thunkApi) => {
        try {
            return await workApi.fetchAdminExperiences();
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch admin experiences');
        }
    }
);

export const createExperience = createAsyncThunk(
    'work/createExperience',
    async (data, thunkApi) => {
        try {
            return await workApi.createExperience(data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to create experience');
        }
    }
);

export const updateExperience = createAsyncThunk(
    'work/updateExperience',
    async ({ id, data }, thunkApi) => {
        try {
            return await workApi.updateExperience(id, data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to update experience');
        }
    }
);

export const deleteExperience = createAsyncThunk(
    'work/deleteExperience',
    async (id, thunkApi) => {
        try {
            await workApi.deleteExperience(id);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to delete experience');
        }
    }
);

export const fetchTimeline = createAsyncThunk(
    'work/fetchTimeline',
    async (experienceId, thunkApi) => {
        try {
            return await workApi.fetchTimeline(experienceId);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch timeline');
        }
    }
);

export const createTimelineEvent = createAsyncThunk(
    'work/createTimelineEvent',
    async ({ experienceId, data }, thunkApi) => {
        try {
            return await workApi.createTimelineEvent(experienceId, data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to create timeline event');
        }
    }
);

export const updateTimelineEvent = createAsyncThunk(
    'work/updateTimelineEvent',
    async ({ eventId, data }, thunkApi) => {
        try {
            return await workApi.updateTimelineEvent(eventId, data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to update timeline event');
        }
    }
);

export const deleteTimelineEvent = createAsyncThunk(
    'work/deleteTimelineEvent',
    async (eventId, thunkApi) => {
        try {
            await workApi.deleteTimelineEvent(eventId);
            return eventId;
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to delete timeline event');
        }
    }
);

export const fetchFeaturedPosts = createAsyncThunk(
    'work/fetchFeaturedPosts',
    async (experienceId, thunkApi) => {
        try {
            return await workApi.fetchFeaturedPosts(experienceId);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch featured posts');
        }
    }
);

export const updateFeaturedPosts = createAsyncThunk(
    'work/updateFeaturedPosts',
    async ({ experienceId, posts }, thunkApi) => {
        try {
            return await workApi.updateFeaturedPosts(experienceId, posts);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to update featured posts');
        }
    }
);

const workSlice = createSlice({
    name: 'work',
    initialState,
    reducers: {
        clearCurrent(state) {
            state.current = null;
            state.timeline = [];
            state.featuredPosts = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExperiences.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchExperiences.fulfilled, (state, action) => {
                state.status = 'idle';
                state.experiences = action.payload;
            })
            .addCase(fetchExperiences.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchExperience.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchExperience.fulfilled, (state, action) => {
                state.status = 'idle';
                state.current = action.payload;
                state.timeline = action.payload.timeline || [];
                state.featuredPosts = action.payload.featured_posts || [];
            })
            .addCase(fetchExperience.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchAdminExperiences.fulfilled, (state, action) => {
                state.experiences = action.payload;
            })
            .addCase(createExperience.fulfilled, (state, action) => {
                state.experiences.push(action.payload);
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                state.experiences = state.experiences.filter(e => e.id !== action.payload);
            })
            .addCase(fetchTimeline.fulfilled, (state, action) => {
                state.timeline = action.payload;
            })
            .addCase(createTimelineEvent.fulfilled, (state, action) => {
                state.timeline.push(action.payload);
            })
            .addCase(updateTimelineEvent.fulfilled, (state, action) => {
                const idx = state.timeline.findIndex(e => e.id === action.payload.id);
                if (idx !== -1) state.timeline[idx] = action.payload;
            })
            .addCase(deleteTimelineEvent.fulfilled, (state, action) => {
                state.timeline = state.timeline.filter(e => e.id !== action.payload);
            })
            .addCase(fetchFeaturedPosts.fulfilled, (state, action) => {
                state.featuredPosts = action.payload;
            })
            .addCase(updateFeaturedPosts.fulfilled, (state, action) => {
                state.featuredPosts = action.payload;
            });
    },
});

export const { clearCurrent } = workSlice.actions;
export default workSlice.reducer;
