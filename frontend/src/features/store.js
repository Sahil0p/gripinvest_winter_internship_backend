import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import productsReducer from './products/productsSlice';
import investmentsReducer from './investments/investmentsSlice';
import logsReducer from './logs/logsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    investments: investmentsReducer,
    logs: logsReducer,
  },
});

export default store;
