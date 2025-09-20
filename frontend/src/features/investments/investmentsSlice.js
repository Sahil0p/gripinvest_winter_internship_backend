import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchPortfolio = createAsyncThunk('investments/fetchPortfolio', async (_, thunkAPI) => {
  try {
    const response = await api.get('/investments/portfolio');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const createInvestment = createAsyncThunk('investments/create', async (data, thunkAPI) => {
  try {
    const response = await api.post('/investments', data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

const investmentsSlice = createSlice({
  name: 'investments',
  initialState: {
    portfolio: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolio = action.payload;
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch portfolio';
      })
      .addCase(createInvestment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvestment.fulfilled, (state, action) => {
        state.loading = false;
        if (state.portfolio) {
          state.portfolio.investments.push(action.payload);
        }
      })
      .addCase(createInvestment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create investment';
      });
  },
});

export default investmentsSlice.reducer;
