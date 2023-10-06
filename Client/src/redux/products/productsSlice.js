import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    const URL = 'http://localhost:3000/products';
    try {
      const response = await fetch(URL);
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },
);

const initialState = {
  products: [],
  isLoading: false,
  searchQuery: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    resetSearchQuery: (state) => {
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = 'false';
      });
  },
});

export const { searchQuery, resetSearchQuery } = productsSlice.actions;

export default productsSlice.reducer;
