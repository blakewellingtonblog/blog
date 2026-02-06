import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import settingsApi from '../../axios/settingsApi';

const initialState = {
    data: null,
    status: 'idle',
    error: null,
};

export const fetchSettings = createAsyncThunk(
    'settings/fetch',
    async (_, thunkApi) => {
        try {
            return await settingsApi.getSettings();
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch settings');
        }
    }
);

export const updateSettings = createAsyncThunk(
    'settings/update',
    async (data, thunkApi) => {
        try {
            return await settingsApi.updateSettings(data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to update settings');
        }
    }
);

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateSettings.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    },
});

export default settingsSlice.reducer;
