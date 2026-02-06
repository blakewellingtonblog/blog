import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import influencesApi from '../../axios/influencesApi';

const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchInfluences = createAsyncThunk(
    'influences/fetchInfluences',
    async (category, thunkApi) => {
        try {
            return await influencesApi.fetchInfluences(category);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch influences');
        }
    }
);

export const fetchAdminInfluences = createAsyncThunk(
    'influences/fetchAdminInfluences',
    async (_, thunkApi) => {
        try {
            return await influencesApi.fetchAdminInfluences();
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch admin influences');
        }
    }
);

export const createInfluence = createAsyncThunk(
    'influences/createInfluence',
    async (data, thunkApi) => {
        try {
            return await influencesApi.createInfluence(data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to create influence');
        }
    }
);

export const updateInfluence = createAsyncThunk(
    'influences/updateInfluence',
    async ({ id, data }, thunkApi) => {
        try {
            return await influencesApi.updateInfluence(id, data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to update influence');
        }
    }
);

export const deleteInfluence = createAsyncThunk(
    'influences/deleteInfluence',
    async (id, thunkApi) => {
        try {
            await influencesApi.deleteInfluence(id);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to delete influence');
        }
    }
);

const influencesSlice = createSlice({
    name: 'influences',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInfluences.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchInfluences.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            .addCase(fetchInfluences.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchAdminInfluences.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(createInfluence.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateInfluence.fulfilled, (state, action) => {
                const idx = state.items.findIndex(i => i.id === action.payload.id);
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(deleteInfluence.fulfilled, (state, action) => {
                state.items = state.items.filter(i => i.id !== action.payload);
            });
    },
});

export default influencesSlice.reducer;
