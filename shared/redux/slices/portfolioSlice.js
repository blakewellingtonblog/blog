import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import portfolioApi from '../../axios/portfolioApi';

const initialState = {
    items: [],
    current: null,
    categories: [],
    status: 'idle',
    error: null,
};

export const fetchPortfolioItems = createAsyncThunk(
    'portfolio/fetchItems',
    async ({ category = null, mediaType = null, featuredOnly = false } = {}, thunkApi) => {
        try {
            return await portfolioApi.fetchItems(category, mediaType, featuredOnly);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch portfolio items');
        }
    }
);

export const fetchPortfolioItem = createAsyncThunk(
    'portfolio/fetchItem',
    async (id, thunkApi) => {
        try {
            return await portfolioApi.getItem(id);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch portfolio item');
        }
    }
);

export const fetchCategories = createAsyncThunk(
    'portfolio/fetchCategories',
    async (_, thunkApi) => {
        try {
            return await portfolioApi.fetchCategories();
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to fetch categories');
        }
    }
);

export const createPortfolioItem = createAsyncThunk(
    'portfolio/create',
    async (data, thunkApi) => {
        try {
            return await portfolioApi.createItem(data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to create portfolio item');
        }
    }
);

export const updatePortfolioItem = createAsyncThunk(
    'portfolio/update',
    async ({ id, data }, thunkApi) => {
        try {
            return await portfolioApi.updateItem(id, data);
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to update portfolio item');
        }
    }
);

export const deletePortfolioItem = createAsyncThunk(
    'portfolio/delete',
    async (id, thunkApi) => {
        try {
            await portfolioApi.deleteItem(id);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to delete portfolio item');
        }
    }
);

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        clearCurrentItem(state) {
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPortfolioItems.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchPortfolioItems.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            .addCase(fetchPortfolioItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchPortfolioItem.fulfilled, (state, action) => {
                state.current = action.payload;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(createPortfolioItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updatePortfolioItem.fulfilled, (state, action) => {
                const idx = state.items.findIndex(i => i.id === action.payload.id);
                if (idx !== -1) state.items[idx] = action.payload;
            })
            .addCase(deletePortfolioItem.fulfilled, (state, action) => {
                state.items = state.items.filter(i => i.id !== action.payload);
            });
    },
});

export const { clearCurrentItem } = portfolioSlice.actions;
export default portfolioSlice.reducer;
